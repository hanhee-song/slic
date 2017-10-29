json.extract! channel, :id, :name, :description, :created_at
json.visible current_user.can_see_channel?(channel)
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
      json.author do
        json.extract! message.author, :id, :username
      end
    end
  end
end
