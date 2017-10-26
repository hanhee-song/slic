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
    if channel_params[:change_visibility]
      subscription = @channel.channel_subscriptions.find_by(
        user_id: channel_params[:user_id])
      debugger
      if @channel.channel_subscriptions.update(visible: channel_params[:visible])
      else
        render json: @channel.errors.full_messages, status: 422
      end
    end
    
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
    params.require(:channel).permit(:name, :description, :channel_id,
      :user_id, :change_visibility, :visible)
  end
end
