class RenameSynthesisId < ActiveRecord::Migration
  def change
    rename_column :collections, :syn_ID, :synthesis_id
  end
end
