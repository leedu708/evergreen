class Category < ActiveRecord::Base

  belongs_to :sector
  has_many :collections, :foreign_key => :category_id, :dependent => :nullify

end
