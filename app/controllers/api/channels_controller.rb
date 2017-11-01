class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all.includes(:subscriptions, :users)
    @counts = {}
    @channels.each do |channel|
      @counts[channel.id] = channel.subscriptions.length
    end
    
    @visibles = {}
    @subscribeds = {}
    current_user.channel_subscriptions.select(:channel_id, :visible)
      .each do |subscription|
        @visibles[subscription.channel_id] = subscription.visible
        @subscribeds[subscription.channel_id] = true
    end
    
    @names = {}
    @channels.each do |channel|
      generate_message_name(channel)
      if channel.is_dm
        @names[channel.id] = generate_message_name(channel)
      else
        @names[channel.id] = channel.name
      end
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
    
    user_ids = option_params[:user_ids].dup
    if user_ids.empty?
      user_ids << current_user.id
    end
    
    # Subscribing a user
    if option_params[:change_subscription]
      send_update = true
      if option_params[:subscribe]
        user_ids.each do |user_id|
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
        
      # Unsubscribing a user
      else
        user_ids.each do |user_id|
          subs = @channel.subscriptions.find_by(user_id: user_id)
          subs.destroy
        end
      end
    end
    
    
    # Change visibility of channel
    if option_params[:change_visibility]
      user_ids.each do |user_id|
        subs = @channel.subscriptions.find_by(user_id: user_id)
        
        if subs
          subs.update(visible: option_params[:visible])
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
    @subscription = channel.subscriptions.find_by(user_id: current_user.id)
    if @subscription
      @visible = @subscription.visible
    end
    if channel.is_dm
      @name = generate_message_name(channel)
    else
      @name = channel.name
    end
  end
  
  def generate_message_name(channel)
    
    names = channel.users.map(&:username) - [current_user.username]
    if names.length <= 0
      "#{current_user.username} (you)"
    elsif names.length == 1
      names[0]
    elsif names.length >= 2 && names.length < 4
      names.join(", ")
    elsif names.length >= 4
      names[0, 3].join(", ") + "and #{names.length - 3} other#{names.length > 4 ? 's' : ''}"
    end
  end
  
  def channel_params
    params.require(:channel).permit(:name, :description, :is_private, :is_dm)
  end

  def option_params
    opt_params = params.require(:options).permit(:change_visibility,
      :visible, { user_ids: [] }, :subscribe, :change_subscription)
    opt_params[:change_visibility] = opt_params[:change_visibility] == "true"
    opt_params[:visible] = opt_params[:visible] == "true"
    opt_params[:subscribe] = opt_params[:subscribe] == "true"
    opt_params[:change_subscription] = opt_params[:change_subscription] == "true"
    opt_params[:user_ids] ||= [];
    opt_params[:user_ids] = opt_params[:user_ids].map(&:to_i)
    return opt_params
  end
end
