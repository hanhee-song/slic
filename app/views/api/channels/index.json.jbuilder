@channels.each do |channel|
  json.set! channel.id do
    json.extract! channel, :id, :name
  end
end
