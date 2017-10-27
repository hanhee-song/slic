class AddRecentChannelsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :most_recent_channel_id, :integer
  end
end
