class Admin::SiteInfoController < AdminController

  before_action :require_admin, :only => [:update]

  def index

    @info = SiteInfo.first

    respond_to do |format|
      format.json { render json: @info.to_json, :status => 200 }
    end

  end

  def update

    @info = SiteInfo.first

    if @info.update(info_params)
      respond_to do |format|
        format.json { render json: @info.to_json, :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, :status => 422 }
      end
    end

  end

  private

  def info_params
    params.require(:site_info).permit(:about, :mission, :contact)
  end

end
