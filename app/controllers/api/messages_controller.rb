class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    @message.author_id = current_user.id
    @message.channel_id = current_user.most_recent_channel_id
    if @message.save
      Pusher.trigger('channel-connection', 'create-message', @message)
      render 'api/messages/show'
    else
      render json: @message.errors.full_messages, status: 404
    end
  end

  def show
  end

  def index
    # @messages = Message.all.include(:author)
  end
  
  private
  
  def message_params
    params.require(:message).permit(:body)
  end
end
