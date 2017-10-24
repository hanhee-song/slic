class CreateChannelSubscriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :channel_subscriptions do |t|
      t.integer :user_id, null: false
      t.integer :channel_id, null: false

      t.timestamps
    end
    add_index :channel_subscriptions, :user_id
    add_index :channel_subscriptions, :channel_id
    add_index :channel_subscriptions, [:channel_id, :user_id], unique: true
  end
end
