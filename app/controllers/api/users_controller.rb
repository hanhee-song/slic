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
      
      create_welcome_message
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
  
  def create_welcome_message
    hanhee = User.find_by(username: 'hanhee-song')
    channel = Channel.new(
      name: SecureRandom::urlsafe_base64(8),
      is_private: true,
      is_dm: true,
      creator_id: hanhee.id
    )
    channel.save!
    channel.subscriptions.create!(
      user_id: @user.id,
      visible: true
    )
    channel.subscriptions.create!(
      user_id: hanhee.id,
      visible: true
    )
    
    Message.create!(
      author_id: hanhee.id,
      channel_id: channel.id,
      body: User.welcome_message
    )
  end
end
