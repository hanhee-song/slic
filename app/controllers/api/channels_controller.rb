class Api::ChannelsController < ApplicationController
  def index
    if option_params[:visible]
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
    channel_id = params[:id]
    user_id = channel_params[:user_id]
    @channel = Channel.find(channel_id)
    
    if option_params[:change_visibility]
      subscription = @channel.channel_subscriptions.find_by(
        user_id: user_id)
      
      if @channel.channel_subscriptions.update(visible: option_params[:visible])
      else
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
    params.require(:channel).permit(:name, :description, :user_id)
  end

  def option_params
    # these are "true" and "false", both are truthy :c
    opt_params = params.require(:options).permit(:change_visibility, :visible)
    opt_params[:change_visibility] = opt_params[:change_visibility] == "true"
    opt_params[:visible] = opt_params[:visible] == "true"
    return opt_params
  end
end
