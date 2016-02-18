class ResourcesController < ApplicationController

  before_action :require_curator, :only => [:create]

  def index

    @resources = Resource.all
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

  private

  def resource_params
    params.require(:resource).permit(:title, :description, :url, :owner_id, :collection_id, :media_type)
  end
  
end
