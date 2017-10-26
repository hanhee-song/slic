class Api::ChannelsController < ApplicationController
  def index
    # @channels = Channel.all
    @channels = current_user.channels
  end
  
  def show
    @channel = Channel.find_by(params[:id])
  end
  
  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      render "api/channels/show"
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end
  
  def update
    @channel = Channel.find(channel_params[:channel_id])
    
    if channel_params[:channel_id] && channel_params[:user_id]
      user = User.find(channel_params[:user_id])
      @channel_subscription = ChannelSubscription.new(channel_params)
      
      if user && @channel && @channel_subscription.save
        user.visible_channels << channel_params[:channel_id]
        user.save
        debugger
        render "api/channels/show"
      else
        render json: @channel.errors.full_messages, status: 422
      end
      
    else
      if @channel.update(channel_params)
        render "api/channels/show"
      else
        render json: @channel.errors.full_messages, status: 422
      end
    end
  end
  
  def destroy
  end
  
  private
  
  def channel_params
    params.require(:channel).permit(:name, :description, :channel_id, :user_id)
  end
end
