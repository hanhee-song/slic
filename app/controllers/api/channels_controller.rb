class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all.includes(:subscriptions)
    @counts = {}
    @channels.each do |channel|
      @counts[channel.id] = channel.subscriptions.length
    end
    
    @visibles = {}
    current_user.channel_subscriptions.select(:channel_id, :visible)
      .each do |subscription|
        @visibles[subscription.channel_id] = subscription.visible
    end
  end
  
  def show
    @channel = Channel.find(params[:id])
    render_show(@channel)
  end
  
  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      render_show(@channel)
      render "api/channels/show"
      Pusher.trigger('channel-connection', 'update-channel', @channel)
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end
  
  def update
    send_update = false
    @channel = Channel.find(params[:id])
      
    # Subscribing a user
    if !option_params[:user_ids].empty?
      option_params[:user_ids].each do |user_id|
        subs = @channel.subscriptions.find_by(user_id: user_id)
        if subs
          subs.update(visible: true)
        else
          @channel.subscriptions.new(
            user_id: user_id,
            visible: true
          ).save
        end
      end
      send_update = true
      
    # Change visibility of channel
    elsif option_params[:change_visibility]
      user_ids = option_params[:user_ids].dup
      if user_ids.empty?
        user_ids << current_user.id
      end
      debugger
      
      user_ids.each do |user_id|
        subs = @channel.subscriptions.find_by(user_id: user_id)
        
        debugger
        if subs
          subs.update(visible: option_params[:visible])
          debugger
        end
      end
      send_update = true
      
    end
    if send_update
      render_show(@channel)
      render "api/channels/show"
      Pusher.trigger('channel-connection', 'update-channel', @channel)
    end
    # Updating the channel
    #   if @channel.update(channel_params)
    #     render_show(@channel)
    #     Pusher.trigger('channel-connection', 'update-channel', @channel)
    #   else
    #     render json: @channel.errors.full_messages, status: 422
    #   end
    # end
  end
  
  def destroy
  end
  
  private
  
  def render_show(channel)
    @messages = channel.messages.includes(:author)
    @visible = false
    subscription = channel.subscriptions.find_by(user_id: current_user.id)
    if subscription
      @visible = subscription.visible
    end
  end
  
  def channel_params
    params.require(:channel).permit(:name, :description, :is_private, :is_dm)
  end

  def option_params
    opt_params = params.require(:options).permit(:change_visibility,
      :visible, { user_ids: [] }, :subscribe)
    opt_params[:change_visibility] = opt_params[:change_visibility] == "true"
    opt_params[:visible] = opt_params[:visible] == "true"
    opt_params[:subscribe] = opt_params[:subscribe] == "true"
    opt_params[:user_ids] ||= [];
    opt_params[:user_ids] = opt_params[:user_ids].map(&:to_i)
    return opt_params
  end
end
