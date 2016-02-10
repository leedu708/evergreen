class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :resources, :foreign_key => 'owner_id', :dependent => :destroy

  def self.all_other_users(current_user)
    User.where('id <> ?', current_user.id)
  end
  
end