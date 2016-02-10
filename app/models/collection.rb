class Collection < ActiveRecord::Base

  belongs_to :sector
  has_many :resources, :foreign_key => :collection_id, :dependent => :nullify

end
