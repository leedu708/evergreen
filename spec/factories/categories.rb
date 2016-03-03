FactoryGirl.define do

  factory :category do
    title         "category_title"
    association :sector
  end

end