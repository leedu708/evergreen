class RemoveUpvotesOnResources < ActiveRecord::Migration
  def change
    remove_column :resources, :upvotes
  end
end
