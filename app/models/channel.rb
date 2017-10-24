class Channel < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  
  has_many :channel_subscriptions
  has_many :users,
    through: :channel_subscriptions,
    source: :user
end
