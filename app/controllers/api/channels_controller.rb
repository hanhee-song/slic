class Api::ChannelsController < ApplicationController
  before_action :ensure_login, only: [:create, :show, :update]
  
  def index
    channels = Channel.all.includes(:subscriptions, :users, :messages, :creator)
    @channels = []
    channels.each do |channel|
      if channel.users.ids.include?(current_user.id) || !channel.is_private
        @channels << channel
      end
    end
    @counts = {}
    @most_recent_activities = {}
    @names = {}
    @avatars = {}
    @channels.each do |channel|
      @counts[channel.id] = channel.subscriptions.length
      @most_recent_activities[channel.id] = channel.messages.last ?
        channel.messages.last.created_at : channel.created_at
      @names[channel.id] = channel.is_dm ?
        generate_message_name(channel) : channel.name
      @avatars[channel.id] = generate_message_avatar(channel)
    end
    
    @visibles = {}
    @subscribeds = {}
    current_user.channel_subscriptions.select(:channel_id, :visible)
      .each do |subscription|
        @visibles[subscription.channel_id] = subscription.visible
        @subscribeds[subscription.channel_id] = true
    end
    
  end
  
  def show
    @channel = Channel.find(params[:id])
    if @channel
      if @channel.is_private && !@channel.users.ids.include?(current_user.id)
        render json: ["Channel not found"], status: 404
      else
        render_show(@channel)
      end
    else
      render json: ["Channel not found"], status: 404
    end
  end
  
  def create
    if channel_params[:is_dm]
      Channel.all.where("is_dm").includes(:users).each do |channel|
        if channel.users.map(&:id).sort == option_params[:user_ids].sort
          @channel = channel
          subs = @channel.subscriptions.find_by(user_id: current_user)
            subs.update(visible: true) if !subs.visible
          
          render_show(@channel)
          render "api/channels/show"
          Pusher.trigger('channel-connection', 'update-channel', @channel.id)
          return
        end
      end
    end
    
    @channel = Channel.new(channel_params)
    if !channel_params[:is_dm]
      @channel.creator_id = current_user.id
    end
    if @channel.save
      option_params[:user_ids].each do |id|
        @channel.subscriptions.create!(
          user_id: id,
          visible: true
        )
      end
      if @channel.is_private && !@channel.users.ids.include?(current_user.id)
        render json: [""], status: 204
      else
        render_show(@channel)
        render "api/channels/show"
        Pusher.trigger('channel-connection', 'update-channel', @channel.id)
      end
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end
  
  def update
    send_update = false
    @channel = Channel.find(params[:id])
    
    user_ids = option_params[:user_ids]
    
    if option_params[:change_subscription]
      send_update = true
      if option_params[:subscribe]
        user_ids.each do |user_id|
          subs = @channel.subscriptions.find_by(user_id: user_id)
          if subs && !subs.visible
            subs.update(visible: true)
          elsif !subs
            @channel.subscriptions.create!(
              user_id: user_id,
              visible: true
            )
          end
        end
        
      else
        user_ids.each do |user_id|
          subs = @channel.subscriptions.find_by(user_id: user_id)
          subs.destroy if subs
        end
      end
    end
    
    if option_params[:change_visibility]
      user_ids.each do |user_id|
        subs = @channel.subscriptions.find_by(user_id: user_id)
        
        if subs && subs.visible != option_params[:visible]
          subs.update(visible: option_params[:visible])
        end
      end
      send_update = true
    end
    
    if send_update
      if @channel.is_private && !@channel.users.ids.include?(current_user.id)
        render json: [""], status: 404
      else
        render_show(@channel)
        render 'api/channels/show'
      end
      Pusher.trigger('channel-connection', 'update-channel', @channel.id)
    else
      render json: ["Channel not found"], status: 404
    end
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
    @name = channel.is_dm ? generate_message_name(channel) : channel.name
    @most_recent_activity = channel.messages.last ?
      channel.messages.last.created_at : channel.created_at
    @avatar = generate_message_avatar(@channel)
  end
  
  def generate_message_name(channel)
    names = channel.users.map(&:username) - [current_user.username]
    names = names.sort
    if names.length <= 0
      "#{current_user.username} (you)"
    elsif names.length >= 1 && names.length < 4
      names.join(", ")
    elsif names.length >= 4
      names[0, 3].join(", ") + " and #{names.length - 3} other#{names.length > 4 ? 's' : ''}"
    end
  end
  
  def generate_message_avatar(channel)
    avatar = channel.users.length > 1 ?
      (channel.users - [current_user]).first.avatar.url
      : current_user.avatar.url
    ActionController::Base.helpers.asset_path(avatar)
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
    opt_params[:user_ids] ||= [current_user.id];
    opt_params[:user_ids] = opt_params[:user_ids].map(&:to_i)
    return opt_params
  end
end
