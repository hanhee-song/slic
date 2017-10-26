class Api::ChannelsController < ApplicationController
  def index
    if params[:options][:visible]
      @channels = current_user.visible_channels
    else
      @channels = current_user.channels
    end
  end
  
  def show
    @channel = Channel.find(params[:id])
    render "api/channels/show"
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
    # No params[:id] coming in
    @channel = Channel.find(channel_params[:channel_id])
    if channel_params[:channel_id] && channel_params[:user_id]
      if @channel.channel_subscriptions.new(user_id: channel_params[:user_id]).save
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
