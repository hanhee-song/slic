# config/initializers/pusher.rb
require 'pusher'

Pusher.app_id = '422618'
Pusher.key = 'ca2400263daf1d3c239d'
Pusher.secret = '91aa3db9eef68f04d64d'
Pusher.cluster = 'us2'
Pusher.logger = Rails.logger
Pusher.encrypted = true
