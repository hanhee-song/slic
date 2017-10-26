@channels.each do |channel|
  json.set! channel.id do
    json.extract! channel, :id, :name, :created_at, :description
    json.user_count channel.users.count
    json.visible current_user.can_see_channel?(channel)
  end
end
