class CreateSiteInfos < ActiveRecord::Migration
  def change
    create_table :site_infos do |t|
      t.string :about, null: false, default: "Add About"
      t.string :contact, null: false, default: "Add Contact"
      t.string :mission, null: false, default: "Add Mission"

      t.timestamps null: false
    end
  end
end
