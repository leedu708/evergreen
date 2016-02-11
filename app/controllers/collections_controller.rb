class CollectionsController < ApplicationController

  def index

    @collections = Collection.all
    respond_to do |format|
      format.json { render json: @collections.to_json(
        :include => [{ :resources => {:include => :owner}}]), :status => 200 }
    end

  end

end
