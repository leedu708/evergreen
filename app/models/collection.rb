class Collection < ActiveRecord::Base

  belongs_to :category
  has_many :resources, :foreign_key => :collection_id, :dependent => :nullify

end
