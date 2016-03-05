class Category < ActiveRecord::Base

  belongs_to :sector
  has_many :collections, :foreign_key => :category_id, :dependent => :nullify
  has_many :resources, :through => :collections

  validates :title, :length => { :in => 1..50 }

  def collection_total
    self.collections.count
  end

  def resource_total
    self.resources.count
  end

end
