class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :resources, :foreign_key => 'owner_id', :dependent => :destroy

  def resource_total
    self.resources.length
  end

  def upvotes
    self.resources.inject(0) { |sum, resource| sum + resource.upvotes }
  end
  
end