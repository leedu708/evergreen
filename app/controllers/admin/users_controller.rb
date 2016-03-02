class Admin::UsersController < AdminController

  before_action :require_admin

  def index

    @users = User.all
    respond_to do |format|
      format.json { render json: @users.to_json(
        :methods => [:resource_total, :upvote_count]), :status => 200 }
    end

  end

  def show

    @user = User.find_by_id(params[:id])
    respond_to do |format|
      format.json { render json: @user.to_json, :status => 200 }
    end

  end

  def update

    @user = User.find_by_id(params[:id])

    if @user.update(user_params)
      respond_to do |format|
        format.json { render json: @user.to_json, :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end

  end

  private

  def user_params
    params.require(:user).permit(:user_type)
  end

end
