class ChannelSubscription < ApplicationRecord
  belongs_to :user
  belongs_to :channel
  validates :visible, inclusion: { in: [true, false] }
end
