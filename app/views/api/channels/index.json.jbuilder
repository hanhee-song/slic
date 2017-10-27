@channels.each do |channel|
  json.set! channel.id do
    json.extract! channel, :id, :name, :created_at, :description
    json.user_count @counts[channel.id]
    json.visible @visibles[channel.id]
  end
end
