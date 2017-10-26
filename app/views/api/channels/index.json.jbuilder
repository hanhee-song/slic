@channels.each do |channel|
  json.set! channel.id do
    json.extract! channel, :id, :name, :created_at, :description
    json.user_count channel.users.count
  end
end
