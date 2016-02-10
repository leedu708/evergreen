class UsersController < ApplicationController

  def index

    @users = User.all_other_users(current_user)
    @users.unshift(current_user)

    respond_to do |format|
      format.json { render json: @users.to_json, :status => 200 }
    end

  end

  def update

    @user = User.find_by_id(params[:id])

    if @user.update(user_params)
      @users = User.all
      respond_to do |format|
        format.json { render :nothing => :true, :status => 200 }
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