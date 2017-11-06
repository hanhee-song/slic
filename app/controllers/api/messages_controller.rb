class Api::MessagesController < ApplicationController
  before_action :ensure_login, only: [:create, :index]
  
  def create
    @message = Message.new(message_params)
    @message.author_id = current_user.id
    @message.channel_id = current_user.most_recent_channel_id
    if @message.save
      Pusher.trigger(
        "channel-connection-#{@message.channel_id}",
        'create-message',
        {
          id: @message.id,
          body: @message.body,
          author_id: @message.author_id,
          channel_id: @message.channel_id,
          parent_message_id: @message.parent_message_id,
          created_at: @message.created_at,
          author: {
            id: @message.author.id,
            username: @message.author.username,
            avatar_url: ActionController::Base.helpers.asset_path(@message.author.avatar.url)
          }
        }
      )
      render 'api/messages/show'
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def show
  end

  def index
    channel_id = params[:channel_id]
    channel = Channel.find(channel_id)
    if !channel ||
      (!current_user.channels.map(&:id).include?(channel_id.to_i) && channel.is_private)
      
      render json: ["Channel not found"], status: 404
    end
    @messages = Message.where(channel_id: channel_id).includes(:author)
  end
  
  private
  
  def message_params
    params.require(:message).permit(:body)
  end
end
