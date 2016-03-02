class ResourcesController < ApplicationController

  before_action :require_curator, :only => [:create, :update, :destroy]
  before_action :require_owner, :only => [:index, :show, :update, :destroy]

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

    if params[:collection_id]
      respond_to do |format|
        format.json { render json: @resources.to_json(
          :include => [:owner, :collection],
          :methods => [:upvote_count]), :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render json: @resources.to_json(
          :methods => [:owner_username,
                       :owner_id,
                       :collection_name,
                       :upvote_count]), :status => 200 }
      end
    end

  end

  def show

    @resource = Resource.find_by_id(params[:id])
    respond_to do |format|
      format.json { render json: @resource.to_json(
        :methods => [:owner_id]), :status => 200 }
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

  def update

    @resource = Resource.find_by_id(params[:id])

    if @resource.update(resource_params)
      respond_to do |format|
        format.json { render nothing: true, :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render nothing => :true, :status => 422 }
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
      respond_to do |format|
        format.json { render nothing => :true, :status => 422 }
      end
    end

  end

  private

  def resource_params
    params.require(:resource).permit(:title, :description, :url, :owner_id, :collection_id, :media_type, :approved)
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
