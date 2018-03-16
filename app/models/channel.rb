class Channel < ApplicationRecord
  validates :name, presence: true, length: { maximum: 24 }
  validates :description, length: { maximum: 100, allow_nil: true }
  validates :is_private, inclusion: { in: [true, false] }
  validates :is_dm, inclusion: { in: [true, false] }
  
  # The following is not validated in the back end
  validates :most_recent_activity, presence: true
  
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
