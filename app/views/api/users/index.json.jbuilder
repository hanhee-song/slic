@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :username, :updated_at, :most_recent_channel_id
  end
end
