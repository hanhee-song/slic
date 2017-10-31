class Channel < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :private, inclusion: { in: [true, false] }
  
  has_many :subscriptions,
    foreign_key: :channel_id,
    class_name: :ChannelSubscription
  has_many :users,
    through: :subscriptions,
    source: :user
  has_many :messages
end
