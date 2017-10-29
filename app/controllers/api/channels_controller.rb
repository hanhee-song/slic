class Api::ChannelsController < ApplicationController
  def index
    @channels = current_user.channels.includes(:subscriptions)
    @counts = {}
    current_user.channels.each do |channel|
      @counts[channel.id] = channel.subscriptions.where(visible: true).length
    end
    @visibles = current_user.channel_subscriptions.select(:channel_id, :visible)
    @visibles = visibles_to_json(@visibles)
    
  end
  
  def show
    @channel = Channel.find(params[:id])
    render_show(@channel)
  end
  
  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      render_show(@channel)
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end
  
  def update
    channel_id = params[:id]
    user_id = channel_params[:user_id] || current_user.id
    @channel = Channel.find(channel_id)
    
    if option_params[:change_visibility]
      subscription = @channel.subscriptions.find_by(
        user_id: user_id)
      
      if @channel.subscriptions.find_by(user_id: user_id)
        .update(visible: option_params[:visible])
        render_show(@channel)
      else
        render json: @channel.errors.full_messages, status: 422
      end
      
    elsif user_id
      if @channel.subscriptions.new(user_id: user_id).save
        render_show(@channel)
      else
        render json: @channel.errors.full_messages, status: 422
      end
      
    else
      if @channel.update(channel_params)
        render_show(@channel)
      else
        render json: @channel.errors.full_messages, status: 422
      end
    end
  end
  
  def destroy
  end
  
  private
  
  def render_show(channel)
    @messages = channel.messages.includes(:author)
    @counts = channel.subscriptions.where(visible: true).length
    render "api/channels/show"
  end
  
  def visibles_to_json(visibles)
    acc = {}
    visibles.as_json.each do |visible|
      acc[visible["channel_id"]] = visible["visible"]
    end
    acc
  end
  
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
