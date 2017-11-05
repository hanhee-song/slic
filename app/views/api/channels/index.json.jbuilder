@channels.each do |channel|
  json.set! channel.id do
    json.extract! channel, :id, :created_at, :description, :is_private, :is_dm
    json.name @names[channel.id]
    json.user_count @counts[channel.id]
    json.visible @visibles[channel.id]
    json.subscribed !!(@subscribeds[channel.id])
    json.most_recent_activity @most_recent_activities[channel.id]
    json.created_at channel.created_at
    json.creator channel.creator
    json.avatar_url @avatars[channel.id]
    
    json.message_ids do
      json.array! channel.messages.map(&:id)
    end
  end
end
