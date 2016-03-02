class Resource < ActiveRecord::Base

  belongs_to :owner, :class_name => 'User'
  belongs_to :collection

  has_many :upvotes, :dependent => :destroy
  has_many :upvoted_users, :through => :upvotes, :source => :user

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

  def upvote_count
    self.upvotes.length
  end

  def upvote_ids
    self.upvoted_users.map { |user| user.id }
  end
  
end
