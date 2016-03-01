class RenameSynthesisToApproved < ActiveRecord::Migration
  def change
    rename_column :resources, :synthesis, :approved
  end
end
