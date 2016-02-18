class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  def angular
    render 'layouts/application'
  end

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
  end

  def require_admin

    unless current_user && current_user.user_type == "admin"
      flash[:danger] = "Unauthorized Access!"
      respond_to do |format|
        format.js { render :nothing => :true, :status => 401 }
        format.html { redirect_to root_path }
      end
    end

  end

  def require_curator

    unless current_user && current_user.user_type != "reader"
      flash[:danger] = "Unauthorized Access!"
      respond_to do |format|
        format.js { render :nothing => :true, :status => 401 }
        format.html { redirect_to root_path }
      end
    end

  end
end
