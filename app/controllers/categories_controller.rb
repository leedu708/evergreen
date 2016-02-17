class CategoriesController < ApplicationController

  def index

    @categories = Category.all
    respond_to do |format|
      format.json { render json: @categories.to_json(
        :include => [ { :collections => {
                        :include => { :resources => {
                        :include => :owner }}
          }}]), :status => 200 }
    end

  end

end