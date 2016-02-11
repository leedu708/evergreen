class ResourcesController < ApplicationController

  def index

    @resources = Resource.all
    respond_to do |format|
      format.json { render json: @resources.to_json(
        :include => [:owner]), :status => 200 }
    end

  end
  
end
