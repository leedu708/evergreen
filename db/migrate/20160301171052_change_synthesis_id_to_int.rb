class ChangeSynthesisIdToInt < ActiveRecord::Migration
  def change
    change_column :collections, :synthesis_id, :integer
  end
end
