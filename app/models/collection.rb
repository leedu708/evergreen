class Collection < ActiveRecord::Base

  belongs_to :category, required: true
  has_many :resources, :foreign_key => :collection_id, :dependent => :nullify
  has_many :upvotes, :through => :resources
  belongs_to :synthesis, class_name: 'Resource', :foreign_key => :synthesis_id

  validates :title, :length => { :in => 1..50 }
  validates :description, :length => { :in => 1..500 }

  def resource_total
    self.resources.length
  end

  def resource_names
    self.resources.map { |resource| [resource.title, resource.id] }
  end

  def approved_IDs
    resources = self.resources.select { |resource| resource.approved }
    resource_ids = resources.map { |resource| resource.id }
    resource_ids.join(", ");
  end

  def self.most_recently_updated
    Collection.all.order('updated_at').limit(2)
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
