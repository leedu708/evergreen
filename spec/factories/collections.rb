FactoryGirl.define do

  factory :collection do
    title           "collection_title"
    description     "collection_description"
    association :category
  end

end