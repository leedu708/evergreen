class CategoriesController < ApplicationController

  before_action :require_admin, :only => [:create, :update, :destroy]

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

  def create

    @category = Category.new(category_params)

    if @category.save
      respond_to do |format|
        format.json { render json: @category.to_json(
          :include => [ { :collections => {
                          :include => { :resources => {
                          :include => :owner }}
            }}]), :status => 201 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, :status => 422 }
      end
    end

  end

  def update

    @category = Category.find_by_id(params[:id])

    if @category.update(category_params)
      respond_to do |format|
        format.json { render json: @category.to_json(
          :include => [ { :collections => {
                          :include => { :resources => {
                          :include => :owner }}
            }}]), :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, :status => 422 }
      end
    end

  end

  def destroy

    @category = Category.find_by_id(params[:id])

    if @category && @category.destroy
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

  def category_params
    params.require(:category).permit(:title, :sector_id)
  end

end