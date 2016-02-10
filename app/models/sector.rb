class Sector < ActiveRecord::Base

  has_many :collections, :foreign_key => :sector_id, :dependent => :nullify
  
end
