class ChannelSubscription < ApplicationRecord
  belongs_to :user
  belongs_to :channel
end
