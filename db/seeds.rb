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
  
  # hanhee-song is me!
  hanhee_song = User.create!(username: 'hanhee-song', password: 'asdfasdf')
  
  16.times do
    User.create!(
      username: "#{Faker::Name.first_name[0]}#{Faker::Name.last_name}".downcase[0, 15],
      password: Faker::Internet.password
    )
  end
  
  
  Channel.destroy_all
  Channel.create!(
    name: 'general',
    description: 'This is for workspace-wide communication and announcements.',
    creator_id: hanhee_song.id
  )
  Channel.create!(
    name: 'random',
    description: 'A place for non-work-related flimflam, faffing, hodge-podge, or jibber-jabber.',
    creator_id: hanhee_song.id
  )
  Channel.create!(
    name: 'project #1',
    creator_id: hanhee_song.id
  )
  Channel.create!(
    name: 'project #2',
    creator_id: hanhee_song.id
  )
  Channel.create!(
    name: 'project #3',
    creator_id: hanhee_song.id
  )
  Channel.create!(
    name: 'project #4',
    creator_id: hanhee_song.id
  )
  Channel.create!(
    name: 'project #5',
    creator_id: hanhee_song.id
  )
  Channel.create!(
    name: 'secret channel',
    creator_id: hanhee_song.id,
    is_private: true
  )
  
  ChannelSubscription.destroy_all
  
  User.all.each do |user|
    next if user == guest || user == hanhee_song
    
    # SUBSCRIBE TO THREE CHANNELS
    Channel.all.each do |channel|
      randomProject = rand(5) + 1
      
      visible = ([
        'general',
        'random',
        "project ##{randomProject}",
      ].include?(channel.name))
      
      if visible
        ChannelSubscription.create!(
          channel_id: channel.id,
          user_id: user.id,
          visible: visible
        )
      end
    end
    user.update(most_recent_channel_id: Channel.find_by(name: 'general').id)
  end
  
  # GUEST SPECIFIC SUBS
  Channel.all.each do |channel|
    visible = ([
      'general',
      'random',
      'project #2',
      'project #5',
      'secret channel'
    ].include?(channel.name))
    if visible
      ChannelSubscription.create!(
        channel_id: channel.id,
        user_id: guest.id,
        visible: visible
      )
      ChannelSubscription.create!(
        channel_id: channel.id,
        user_id: hanhee_song.id,
        visible: visible
      )
    end
  end
  guest.update(most_recent_channel_id: Channel.find_by(name: 'general').id)
  
  # CREATE RANDOM PRIVATE MESSAGES FOR GUEST
  accounts = User.limit(18)[3..16]
  
  # CHAT WITH SELF
  # dm1 = Channel.create!(
  #   name: SecureRandom::urlsafe_base64(8),
  #   is_private: true,
  #   is_dm: true
  # )
  # ChannelSubscription.create!(
  #   channel_id: dm1.id,
  #   user_id: guest.id,
  #   visible: true
  # )
  
  # CHAT WITH ME
  dm = Channel.create!(
    name: SecureRandom::urlsafe_base64(8),
    is_private: true,
    is_dm: true
  )
  ChannelSubscription.create!(
    channel_id: dm.id,
    user_id: guest.id,
    visible: true
  )
  ChannelSubscription.create!(
    channel_id: dm.id,
    user_id: hanhee_song.id,
    visible: true
  )
  Message.create!(
    author_id: hanhee_song.id,
    channel_id: dm.id,
    body: "Hi there! Welcome to my Slic app."
  )
  
  # CHAT WITH ANOTHER
  dm2 = Channel.create!(
    name: SecureRandom::urlsafe_base64(8),
    is_private: true,
    is_dm: true
  )
  ChannelSubscription.create!(
    channel_id: dm2.id,
    user_id: guest.id,
    visible: true
  )
  ChannelSubscription.create!(
    channel_id: dm2.id,
    user_id: accounts[rand(14)].id,
    visible: true
  )
  
  # CHAT WITH THREE
  dm3 = Channel.create!(
    name: SecureRandom::urlsafe_base64(8),
    is_private: true,
    is_dm: true
  )
  ChannelSubscription.create!(
    channel_id: dm3.id,
    user_id: guest.id,
    visible: true
  )
  3.times do |i|
    ChannelSubscription.create!(
      channel_id: dm3.id,
      user_id: accounts[i + 5].id,
      visible: true
    )
  end
  
  # SPAM THE CHANNELS!
  User.all.includes(:channels).each do |user|
    user.channels.each do |channel|
      next if user == guest || user == hanhee_song
      Message.create!(
        author_id: user.id,
        channel_id: channel.id,
        body: (Faker::HitchhikersGuideToTheGalaxy.quote)
      )
    end
  end
end
