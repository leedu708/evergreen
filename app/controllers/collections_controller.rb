class CollectionsController < ApplicationController

  before_action :require_admin, :only => [:create, :destroy]

  def index

    @collections = Collection.all
    respond_to do |format|
      format.json { render json: @collections.to_json(
        :methods => [:resource_total,
                     :syn_IDs]), :status => 200 }
    end

  end

  def create

    @collection = Collection.new(collection_params)

    if @collection.save
      respond_to do |format|
        format.json { render json: @collection.to_json(
          :methods => [:resource_total,
                       :syn_IDs]), :status => 201 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, :status => 422 }
      end
    end

  end

  def update

    @collection = Collection.find_by_id(params[:id])

    if @collection.update(collection_params)
      respond_to do |format|
        format.json { render json: @collection.to_json(
          :methods => [:resource_total,
                       :syn_IDs]), :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, :status => 422 }
      end
    end

  end

  def destroy

    @collection = Collection.find_by_id(params[:id])

    if @collection && @collection.destroy
      respond_to do |format|
        format.json { render nothing: true, :status => 204 }
      end
    else
      respond_to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end

  end

  private

  def collection_params
    params.require(:collection).permit(:title, :description, :category_id)
  end

end