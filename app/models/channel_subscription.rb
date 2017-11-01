class ChannelSubscription < ApplicationRecord
  validates :visible, inclusion: { in: [true, false] }
  validates :channel_id, uniqueness: { scope: :user_id,
    message: "Duplicate entry" }
  belongs_to :user
  belongs_to :channel,
    foreign_key: :channel_id,
    class_name: :Channel
end
