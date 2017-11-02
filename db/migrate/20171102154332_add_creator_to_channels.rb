class AddCreatorToChannels < ActiveRecord::Migration[5.1]
  def change
    add_column :channels, :creator_id, :integer
  end
end
