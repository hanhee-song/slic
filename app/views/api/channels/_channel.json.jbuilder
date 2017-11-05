json.extract! channel, :id, :name, :description, :created_at, :is_private, :is_dm
json.name @name
json.user_count channel.subscriptions.length
json.visible @visible
json.subscribed !!(@subscription)
json.most_recent_activity @most_recent_activity
json.created_at channel.created_at
json.creator channel.creator

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

json.avatar_url @avatar
