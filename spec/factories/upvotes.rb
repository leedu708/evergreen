FactoryGirl.define do

  factory :upvote do
    association :user
    association :resource
  end

end