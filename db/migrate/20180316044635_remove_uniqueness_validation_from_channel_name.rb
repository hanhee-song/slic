class RemoveUniquenessValidationFromChannelName < ActiveRecord::Migration[5.1]
  def change
    remove_index :channels, :name
  end
end
