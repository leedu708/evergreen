FactoryGirl.define do

  factory :user, aliases: [:owner] do
    username  "user"
    sequence(:email) { |n| "test#{n}@test.com" }
    password  "password"
    user_type "curator"
  end

  factory :reader, :class => :user do
    username  "readerTester"
    email     "reader@test.com"
    password  "password"
    user_type "reader"
  end

  factory :curator, :class => :user do
    username  "curatorTester"
    email     "curator@test.com"
    password  "password"
    user_type "curator"
  end

  factory :admin, :class => :user do
    username  "adminTester"
    email     "admin@test.com"
    password  "password"
    user_type "admin"
  end

end