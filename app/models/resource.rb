class Resource < ActiveRecord::Base

  belongs_to :owner, :class_name => 'User'
  belongs_to :collection, required: true

  has_many :upvotes, :dependent => :destroy
  has_many :upvoted_users, :through => :upvotes, :source => :user

  validates :title, :length => { :in => 1..200 }
  validates :description, :length => { :in => 1..1000 }
  validates :url, :format => { :with => /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?\z/ }

  def owner_username
    self.owner.username
  end

  def collection_name
    self.collection.title
  end

  def upvote_count
    self.upvotes.count
  end

  def upvote_ids
    self.upvoted_users.map { |user| user.id }
  end

  def self.search(query)

    if query
      where('lower(title) LIKE ? OR lower(description) LIKE ?', "%#{query.downcase}%", "%#{query.downcase}%")
    else
      where("")
    end

  end
  
end
