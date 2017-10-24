class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
  end
  
  def show
    @channel = Channel.find_by(params[:id])
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
  end
  
  def destroy
  end
  
  private
  
  def channel_params
    params.require(:channel).permit(:name, :description)
  end
end
