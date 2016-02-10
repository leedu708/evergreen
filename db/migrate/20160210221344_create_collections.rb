class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.string :title
      t.text :description, null: false
      t.integer :sector_id

      t.timestamps null: false
    end
  end
end
