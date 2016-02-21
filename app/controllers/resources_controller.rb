class ResourcesController < ApplicationController

  before_action :require_curator, :only => [:create, :destroy]
  before_action :require_owner, :only => [:index]

  def index

    # resource index for specific user
    if params[:user_id]
      @resources = User.find(params[:user_id]).resources

    # resource index for specific collection
    elsif params[:collection_id]
      @resources = Collection.find(params[:collection_id]).resources

    # resource index, should only accessed for admin dashboard
    # maybe use for search later
    else
      @resources = Resource.all
    end

    respond_to do |format|
      format.json { render json: @resources.to_json(
        :include => [:owner, :collection]), :status => 200 }
    end

  end

  def create

    @resource = Resource.new(resource_params)

    if @resource.save
      respond_to do |format|
        format.json { render json: @resource.to_json, :status => 201 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, :status => 422 }
      end
    end

  end

  def destroy

    @resource = Resource.find_by_id(params[:id])

    if @resource && @resource.destroy
      respond_to do |format|
        format.json { render nothing: true, :status => 204 }
      end
    else
      respond_ to do |format|
        format.json { render nothing => :true, :status => 422 }
      end
    end

  end

  private

  def resource_params
    params.require(:resource).permit(:title, :description, :url, :owner_id, :collection_id, :media_type)
  end

  def require_owner

    if params[:user_id]
      user = User.find_by_id(params[:user_id])
      unless current_user.id == user.id || current_user.user_type == "admin"
        flash[:danger] = "Unauthorized Access!"
        respond_to do |format|
          format.json { render :nothing => :true, :status => 401 }
          format.html { redirect_to root_path }
        end
      end
    end

  end
  
end
