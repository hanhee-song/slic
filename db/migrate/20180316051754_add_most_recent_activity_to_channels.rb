class AddMostRecentActivityToChannels < ActiveRecord::Migration[5.1]
  def change
    add_column :channels, :most_recent_activity, :datetime, null: false, default: Time.now
  end
end
