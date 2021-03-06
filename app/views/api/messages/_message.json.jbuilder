json.extract! message, :id, :body, :author_id, :channel_id, :parent_message_id, :created_at
json.author do
  json.extract! message.author, :id, :username
  json.avatar_url asset_path(message.author.avatar.url)
end
