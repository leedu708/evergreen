class Sector < ActiveRecord::Base

  has_many :categories, :foreign_key => :sector_id, :dependent => :nullify
  has_many :collections, :through => :categories
  has_many :resources, :through => :collections
  has_many :upvotes, :through => :resources

  def category_total
    self.categories.count
  end

  def collection_total
    self.collections.count
  end

  def resource_total
    self.resources.count
  end

  def all_totals

    [self.category_total, self.collection_total, self.resource_total]

  end

  def top_three
    resource_ids = self.upvotes.group('resource_id').order('count_id DESC').limit(3).count(:id)

    output = [[],[],[]]

    resource_ids.each do |id|
      output[0].push(Resource.find(id[0]))
      output[1].push(Resource.find(id[0]).owner.username)
      output[2].push(id[1])
    end

    output

  end
  
end