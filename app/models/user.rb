class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Send our users an email after signup
  after_create :send_signup_mail

  has_many :resources, :foreign_key => 'owner_id', :dependent => :destroy

  has_many :upvotes, :dependent => :destroy
  has_many :upvoted_resources, :through => :upvotes, :source => :resource

  def resource_total
    self.resources.length
  end

  def upvote_count
    self.upvotes.count
  end

  def send_signup_mail
  	ReaderMailer.signup(self).deliver_now
  end
  
end