class User < ApplicationRecord
  validates :password_digest, presence: true
  validates :username, :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  serialize :visible_channels, Array
  
  attr_reader :password
  
  has_many :channel_subscriptions
  has_many :channels,
    through: :channel_subscriptions,
    source: :channel
  
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
end
