class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.string :title, null: false
      t.string :url, null: false
      t.text :description, null: false
      t.string :media_type, default: ""
      t.integer :upvotes, default: 0, null: false
      t.boolean :synthesis, default: false, null: false
      t.integer :owner_id
      t.integer :collection_id

      t.timestamps null: false
    end
  end
end
