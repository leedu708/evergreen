class AddSynthesisIdToCollection < ActiveRecord::Migration
  def change
    add_column :collections, :syn_ID, :string
  end
end
