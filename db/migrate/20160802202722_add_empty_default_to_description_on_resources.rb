class AddEmptyDefaultToDescriptionOnResources < ActiveRecord::Migration
  def change
    change_column :resources, :description, :string, default: ""
  end
end
