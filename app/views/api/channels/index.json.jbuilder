@channels.each do |channel|
  json.set! channel.id do
    json.extract! channel, :id, :created_at, :description, :is_private, :is_dm
    json.name @names[channel.id]
    json.user_count @counts[channel.id]
    json.visible @visibles[channel.id]
    json.subscribed !!(@subscribeds[channel.id])
    json.most_recent_activity @most_recent_activities[channel.id]

    json.users do
      channel.users.each do |user|
        json.set! user.id do
          json.partial! 'api/users/user', user: user
        end
      end
    end
    
    json.message_ids do
      json.array! channel.messages.map(&:id)
    end
  end
end
