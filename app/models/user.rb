class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :resources, :foreign_key => 'owner_id', :dependent => :destroy

  has_many :upvotes, :dependent => :destroy
  has_many :upvoted_resources, :through => :upvotes, :source => :resource

  def resource_total
    self.resources.length
  end

  def upvote_count
    self.upvotes.count
  end
  
end