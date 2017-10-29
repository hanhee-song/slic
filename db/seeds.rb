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
  
  # asdf is me!
  asdf = User.create!(username: 'asdf', password: 'asdfasdf')
  
  38.times do
    User.create!(
      username: "#{Faker::Name.first_name}-#{Faker::Name.last_name}",
      password: Faker::Internet.password
    )
  end
  
  
  Channel.destroy_all
  Channel.create!(name: 'general', description: 'This is for workspace-wide communication and announcements.')
  Channel.create!(name: 'random', description: 'A place for non-work-related flimflam, faffing, hodge-podge, or jibber-jabber.')
  Channel.create!(name: 'project #1')
  Channel.create!(name: 'project #2')
  Channel.create!(name: 'project #3')
  Channel.create!(name: 'project #4')
  Channel.create!(name: 'project #5')
  
  ChannelSubscription.destroy_all
  
  User.all.each do |user|
    next if user == guest
    
    Channel.all.each do |channel|
      randomProject = rand(5) + 1
      visible = ([
        'general',
        'random',
        "project ##{randomProject}",
      ].include?(channel.name))
      ChannelSubscription.create!(
        channel_id: channel.id,
        user_id: user.id,
        visible: visible
      )
    end
    user.update(most_recent_channel_id: Channel.find_by(name: 'general').id)
  end
  
  # GUEST SPECIFIC SUBS
  Channel.all.each do |channel|
    visible = ([
      'general',
      'random',
      'project #2',
      'project #5'
    ].include?(channel.name))
    ChannelSubscription.create!(
      channel_id: channel.id,
      user_id: guest.id,
      visible: visible
    )
  end
  guest.update(most_recent_channel_id: Channel.find_by(name: 'general').id)
  
end
