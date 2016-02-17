class Sector < ActiveRecord::Base

  has_many :categories, :foreign_key => :sector_id, :dependent => :nullify
  
end