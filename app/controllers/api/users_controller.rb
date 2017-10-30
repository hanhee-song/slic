class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      # TEMP: subscribe user to all existing channels
      Channel.all.each do |channel|
        visible = channel.name == "general" || channel.name == "random"
        ChannelSubscription.create!(
          channel_id: channel.id,
          user_id: @user.id,
          visible: visible
        )
        if channel.name == "general"
          @user.update(most_recent_channel_id: channel.id)
        end
      end
      #
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
