# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do
  User.destroy_all
  guest = User.new(username: 'slic-guest', password: 'asdfasdf')
  guest.save!
  User.create!(username: 'boss', password: 'asdfasdf')
  User.create!(username: 'hi', password: 'asdfasdf')
  
  
  Channel.destroy_all
  Channel.create!(name: 'general', description: 'This is for workspace-wide communication and announcements.')
  Channel.create!(name: 'random', description: 'A place for non-work-related flimflam, faffing, hodge-podge, or jibber-jabber.')
  Channel.create!(name: 'projects')
  
  ChannelSubscription.destroy_all
  
  User.all.each do |user|
    ChannelSubscription.create!(
      channel_id: Channel.find_by(name: 'general').id,
      user_id: user.id,
      visible: true
    )
    ChannelSubscription.create!(
      channel_id: Channel.find_by(name: 'random').id,
      user_id: user.id,
      visible: true
    )
    
    user.update(most_recent_channel_id: Channel.find_by(name: 'general').id)
  end
  
  # GUEST SPECIFIC SUBS
  
  # PROJECTS CHANNEL
  ChannelSubscription.create!(
    channel_id: Channel.find_by(name: 'projects').id,
    user_id: guest.id,
    visible: true
  )
  
  ChannelSubscription.create!(
    channel_id: Channel.find_by(name: 'projects').id,
    user_id: User.find_by(username: 'boss').id,
    visible: true
  )
  
  
  
end
