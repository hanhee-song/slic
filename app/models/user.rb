class User < ApplicationRecord
  validates :password_digest, presence: true
  validates :username, :session_token, presence: true, uniqueness: true
  validates :username, length: { maximum: 24 }
  validates :password, length: { minimum: 6, allow_nil: true }
  has_attached_file :avatar, default_url: :random_default_avatar# "default_avatar.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

  attr_reader :password
  
  has_many :channel_subscriptions
  has_many :channels,
    through: :channel_subscriptions,
    source: :channel
  has_many :messages
  has_many :created_channels,
    foreign_key: :creator_id,
    class_name: :Channel
  
  after_initialize :ensure_token
  
  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def generate_token
    SecureRandom::urlsafe_base64
  end
  
  def ensure_token
    self.session_token ||= generate_token
  end
  
  def reset_token!
    self.session_token = generate_token
    self.save!
    self.session_token
  end
  
  def visible_channels
    self.channels.joins(:channel_subscriptions).where("channel_subscriptions.visible": true)
  end
  
  def can_see_channel?(channel)
    channel_sub = self.channel_subscriptions.find_by(channel_id: channel.id)
    channel_sub && channel_sub.visible
  end
  
  def self.welcome_message
    "Hi there! Welcome to Slic."
  end
  
  private
  
  def random_default_avatar
    "avatar_#{self.id % 5 + 1}.png"
  end
end
