FactoryGirl.define do

  factory :resource, aliases: [:synthesis] do
    title         "resource_title"
    description   "resource_description"
    url           "http://www.google.com"
    association :owner
    association :collection
  end

end