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
      # TEMP: subscribe all users to a new channel
      if !@channel.is_private
        User.all.each do |user|
          ChannelSubscription.create!(
            channel_id: @channel.id,
            user_id: user.id,
            visible: false
          )
        end
      end
      render_show(@channel)
      
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end
  
  def update
    channel_id = params[:id]
    user_id = channel_params[:user_id] || current_user.id
    @channel = Channel.find(channel_id)
    
    channel_sub = @channel.subscriptions.find_by(user_id: user_id)
    
    # Making a channel visible
    if option_params[:change_visibility]
      if @channel.subscriptions.find_by(user_id: user_id)
        .update(visible: option_params[:visible])
        render_show(@channel)
        Pusher.trigger('channel-connection', 'update-channel', @channel)
      else
        render json: @channel.errors.full_messages, status: 422
      end
      
    # Subscribing a user
    elsif user_id
      if channel_sub || @channel.subscriptions.new(user_id: user_id).save
        render_show(@channel)
        Pusher.trigger('channel-connection', 'update-channel', @channel)
      else
        render json: @channel.errors.full_messages, status: 422
      end
    
    # Updating the channel
    else
      if @channel.update(channel_params)
        render_show(@channel)
        Pusher.trigger('channel-connection', 'update-channel', @channel)
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
    @users = @channel.users.joins(:channel_subscriptions).where("channel_subscriptions.visible", true)
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
    params.require(:channel).permit(:name, :description,
      :user_id, :is_private, :is_dm)
  end

  def option_params
    # these are "true" and "false", both are truthy :c
    opt_params = params.require(:options).permit(:change_visibility, :visible)
    opt_params[:change_visibility] = opt_params[:change_visibility] == "true"
    opt_params[:visible] = opt_params[:visible] == "true"
    return opt_params
  end
end
