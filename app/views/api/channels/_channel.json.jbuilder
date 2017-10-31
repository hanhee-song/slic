json.extract! channel, :id, :name, :description, :created_at, :is_private, :is_dm
json.user_count channel.subscriptions.length # @counts
json.visible @visible
json.subscribed !!(@subscription)

json.message_ids do
  json.array! channel.messages.map(&:id)
end

json.users do
  channel.users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end
json.messages do
  @messages.each do |message|
    json.set! message.id do
      json.partial! 'api/messages/message', message: message
    end
  end
end
