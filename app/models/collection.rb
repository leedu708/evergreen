class Collection < ActiveRecord::Base

  belongs_to :category, required: true
  has_many :resources, :foreign_key => :collection_id, :dependent => :nullify
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

end
