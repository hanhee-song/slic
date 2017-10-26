class Api::ChannelsController < ApplicationController
  def index
    debugger
    if option_params[:visible]
      debugger
      @channels = current_user.visible_channels
    else
      debugger
      @channels = current_user.channels
    end
  end
  
  def show
    # debugger
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
    channel_id = channel_params[:channel_id] || params[:id]
    user_id = channel_params[:user_id]
    @channel = Channel.find(channel_id)
    
    debugger
    if channel_params[:change_visibility]
      subscription = @channel.channel_subscriptions.find_by(
        user_id: user_id)
      debugger
      
      if @channel.channel_subscriptions.update(visible: channel_params[:visible])
        debugger
      else
        debugger
        render json: @channel.errors.full_messages, status: 422
      end
      
    elsif user_id
      if @channel.channel_subscriptions.new(user_id: user_id).save
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
    chan_params = params.require(:channel).permit(:name, :description, :channel_id,
      :user_id, :change_visibility, :visible)
    chan_params[:change_visibility] = chan_params[:change_visibility] == "true"
    chan_params[:visible] = chan_params[:visible] == "true"
    return chan_params
  end
  
  def option_params
    opt_params = params.require(:options).permit(:visible)
    opt_params[:visible] = opt_params == "true"
    return opt_params
  end
end
