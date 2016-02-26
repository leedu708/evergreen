class Category < ActiveRecord::Base

  belongs_to :sector
  has_many :collections, :foreign_key => :category_id, :dependent => :nullify

  def collection_total
    self.collections.length
  end

  def resource_total
    self.collections.inject(0) { |sum, collection| sum + collection.resources.length }
  end

end
