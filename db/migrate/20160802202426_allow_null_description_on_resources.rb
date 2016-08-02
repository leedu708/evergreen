class AllowNullDescriptionOnResources < ActiveRecord::Migration
  def change
    change_column :resources, :description, :string, null: true
  end
end
