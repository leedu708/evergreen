class Sector < ActiveRecord::Base

  has_many :categories, :foreign_key => :sector_id, :dependent => :nullify

  def category_total
    self.categories.length
  end

  def collection_total
    self.categories.inject(0) { |sum, category| sum + category.collections.length }
  end

  def resource_total
    resources = 0
    self.categories.length.times do |i|
      resources += self.categories[i].collections.inject(0) { |sum, collection| sum + collection.resources.length }
    end
    resources
  end

  def top_three
    resources = []

    self.categories.each do |category|
      category.collections.each do |collection|
        collection.resources.each do |resource|
          resources.push(resource)
        end
      end
    end

    sorted = resources.sort { |left, right| right.upvotes <=> left.upvotes }

    top = []
    3.times do |x|
      top.push(sorted[x])
    end

    top
  end
  
end