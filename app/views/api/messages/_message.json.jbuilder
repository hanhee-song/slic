json.extract! message, :id, :body, :author_id, :channel_id, :parent_message_id
json.author do
  json.extract! message.author, :id, :username
end
