class Resource < ActiveRecord::Base

  belongs_to :owner, :class_name => 'User'
  belongs_to :collection

  def owner_username
    self.owner.username
  end

  def owner_id
    self.owner.id
  end

  def collection_name
    self.collection.title
  end

  def collection_id
    self.collection.id
  end
  
end
