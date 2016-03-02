class UsersController < ApplicationController

  before_action :require_current_user, :only => [:upvote]

  def index

    @user = current_user

    if @user
      respond_to do |format|
        format.json { render json: @user.to_json, :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end

  end

  def upvote

    @resource = Resource.find(params[:id])

    if @resource.upvotes.create(user_id: current_user.id)
      respond_to do |format|
        format.json { render json: @resource.to_json, :status => 200 }
      end

    else
      respond_to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end

  end

  private

  def require_current_user

    unless current_user
      flash[:danger] = "You must be logged in!"
      respond_to do |format|
        format.json { render :nothing => :true, :status => 422 }
      end
    end

  end

end
