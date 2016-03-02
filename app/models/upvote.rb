class Upvote < ActiveRecord::Base

  belongs_to :user
  belongs_to :resource
  validates_uniqueness_of :resource_id, :scope => :user_id

end