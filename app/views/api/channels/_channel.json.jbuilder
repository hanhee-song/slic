json.extract! channel, :id, :name, :description, :created_at
json.users do
  channel.users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end
