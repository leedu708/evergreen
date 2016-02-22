# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

SiteInfo.delete_all
User.delete_all
Sector.delete_all
Category.delete_all
Collection.delete_all
Resource.delete_all

MULTIPLIER = 8

puts 'Old records destroyed'

SiteInfo.create()

puts 'Default site info set'

User.create(:email => "admin@test.com",
            :username => "adminTester",
            :password => "password",
            :password_confirmation => "password",
            :user_type => "admin")

puts 'Created test admin [:email => admin@test.com, :password => password]'

User.create(:email => "curator@test.com",
            :username => "curatorTester",
            :password => "password",
            :password_confirmation => "password",
            :user_type => "curator")

puts 'Created test curator [:email => curator@test.com, :password => password]'

(2 * MULTIPLIER).times do
  User.create(:email => Faker::Internet.email,
              :username => Faker::Internet.user_name,
              :password => "password",
              :password_confirmation => "password",
              :user_type => "curator")
end

puts 'Created random curators'

(3).times do
  Sector.create(:title => Faker::Book.genre)
end

puts 'Sectors Created'

Sector.all.each do |sector|
  (rand(MULTIPLIER / 3) + 2).times do
    sector.categories.create(:title => Faker::Company.buzzword)
  end
end

puts 'Categories Created'

Category.all.each do |category|
  (rand(MULTIPLIER / 2) + 1).times do
    category.collections.create(:title => Faker::Company.buzzword,
                                :description => Faker::Lorem.sentence(3, true, 6),
                                :created_at => rand(Time.now - category.created_at).seconds.ago)
  end
end

puts 'Collections Created'

User.all.each do |user|
  (rand(6 * MULTIPLIER)).times do
    collection_id = rand(Collection.all.length) + 1
    random_synthesis = [true, false, false, false, false, false, false].sample
    user.resources.create(:title => Faker::Lorem.sentence(2, true, 3).chomp('.'),
                          :url => Faker::Internet.url('test.com'),
                          :description => Faker::Lorem.sentence(4, true, 7),
                          :upvotes => rand(10000) + 1,
                          :collection_id => collection_id,
                          :synthesis => random_synthesis,
                          :created_at => rand(Time.now - user.created_at).seconds.ago)
  end
end

puts 'Resources Created'

User.create(:email => "reader@test.com",
            :username => "readerTester",
            :password => "password",
            :password_confirmation => "password",
            :user_type => "reader")

puts 'Created test reader [:email => reader@test.com, :password => password]'

(3 * MULTIPLIER).times do
  User.create(:email => Faker::Internet.email,
              :username => Faker::Internet.user_name,
              :password => "password",
              :password_confirmation => "password",
              :user_type => "reader")
end

puts 'Created random readers'

puts 'SEEDING COMPLETE'