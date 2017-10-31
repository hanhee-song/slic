@channels.each do |channel|
  json.set! channel.id do
    json.extract! channel, :id, :name, :created_at, :description, :is_private, :is_dm
    json.user_count @counts[channel.id]
    json.visible @visibles[channel.id]
    json.subscribed !!(@subscribeds[channel.id])
    
    json.message_ids do
      json.array! channel.messages.map(&:id)
    end
  end
end
