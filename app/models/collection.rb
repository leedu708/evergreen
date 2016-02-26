class Collection < ActiveRecord::Base

  belongs_to :category
  has_many :resources, :foreign_key => :collection_id, :dependent => :nullify

  def resource_total
    self.resources.length
  end

  def syn_IDs
    resources = self.resources.select { |resource| resource.synthesis }
    resource_ids = resources.map { |resource| resource.id }
    resource_ids.join(", ");
  end

end
