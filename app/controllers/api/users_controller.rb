class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      
      first_channel = Channel.first
      
      first_channel.subscriptions.create!(
        user_id: @user.id,
        visible: true
      )
      @user.update(most_recent_channel_id: first_channel.id)
      
      # self_dm = Channel.create!(
      #   name: rand(99999999),
      #   is_private: true,
      #   is_dm: true
      # )
      #
      # self_dm.subscriptions.create!(
      #   user_id: @user.id,
      #   visible: true
      # )
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
  
  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render "api/users/show"
    else
      render json: @users.errors.full_messages, status: 422
    end
  end

  def show
  end
  
  def index
    @users = User.all
  end

  def destroy
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :password, :most_recent_channel_id)
  end
end
