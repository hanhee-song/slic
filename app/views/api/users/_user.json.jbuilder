json.extract! user, :id, :username, :updated_at, :most_recent_channel_id
json.avatar_url asset_path(user.avatar.url)
