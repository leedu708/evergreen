class SectorsController < ApplicationController

  def index

    @sectors = Sector.all
    respond_to do |format|
      format.json { render json: @sectors.to_json(
        :include => [{ :collections => {
                       :include => { :resources => {
                       :include => :owner }}
          }}]), :status => 200 }
    end

  end

end