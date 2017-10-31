class AddPrivateToChannel < ActiveRecord::Migration[5.1]
  def change
    add_column :channels, :is_private, :boolean, null: false, default: false
  end
end
