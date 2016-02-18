class UsersController < ApplicationController

  def index

    @user = current_user

    if @user
      respond_to do |format|
        format.json { render json: @user.to_json, :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render :nothing => true, :status => 422 }
      end
    end

  end

end
