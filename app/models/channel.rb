class Channel < ApplicationRecord
  validates :name, presence: true, uniqueness: true, length: { maximum: 16 }
  validates :description, length: { maximum: 100, allow_nil: true }
  validates :is_private, inclusion: { in: [true, false] }
  validates :is_dm, inclusion: { in: [true, false] }
  
  has_many :subscriptions,
    foreign_key: :channel_id,
    class_name: :ChannelSubscription
  has_many :users,
    through: :subscriptions,
    source: :user
  has_many :messages
  belongs_to :creator,
    foreign_key: :creator_id,
    class_name: :User,
    optional: true
end
