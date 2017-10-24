class Api::ChannelsController < ApplicationController
  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      render "api/channels/#{@channel.id}"
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end
  
  def update
  end
  
  def destroy
  end
  
  private
  
  def channel_params
    params.require(:channel).permit(:name, :description)
  end
end
