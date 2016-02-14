class SectorsController < ApplicationController

  before_action :require_admin, :only => [:create, :destroy]

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

  def create

    @sector = Sector.new(sector_params)

    if @sector.save
      respond_to do |format|
        format.json { render json: @sector.to_json(
          :include => [{ :collections => {
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

  def destroy

    @sector = Sector.find_by_id(params[:id])

    if @sector && @sector.destroy
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

  def sector_params
    params.require(:sector).permit(:title)
  end

  def require_admin

    # anon user returns nil
    unless current_user && current_user.user_type == "admin"
      flash[:danger] = "Unauthorized Access!"
      respond_to do |format|
        format.js { render :nothing => :true, :status => 401 }
        format.html { redirect_to root_path }
      end
    end

  end

end