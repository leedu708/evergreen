class ChangeSectorIdOnCollectionsToCategoryId < ActiveRecord::Migration
  def change
    rename_column :collections, :sector_id, :category_id
  end
end
