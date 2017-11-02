# config/initializers/pusher.rb
require 'pusher'

Pusher.app_id = ENV["pusher_app_id"]
Pusher.key = ENV["pusher_key"]
Pusher.secret = ENV["pusher_secret"]
Pusher.cluster = 'us2'
Pusher.logger = Rails.logger
Pusher.encrypted = true
