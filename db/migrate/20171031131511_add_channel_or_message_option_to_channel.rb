class AddChannelOrMessageOptionToChannel < ActiveRecord::Migration[5.1]
  def change
    add_column :channels, :is_dm, :boolean, null: false, default: false
  end
end
