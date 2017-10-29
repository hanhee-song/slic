class ChannelSubscription < ApplicationRecord
  belongs_to :user
  belongs_to :channel,
    foreign_key: :channel_id,
    class_name: :Channel
  validates :visible, inclusion: { in: [true, false] }
end
