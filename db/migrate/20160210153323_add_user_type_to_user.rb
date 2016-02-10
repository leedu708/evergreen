class AddUserTypeToUser < ActiveRecord::Migration
  def change
    add_column :users, :user_type, :string, null: false, default: "reader"
  end
end
