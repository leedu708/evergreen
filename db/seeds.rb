# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all
Sector.delete_all
Collection.delete_all
Resource.delete_all

MULTIPLIER = 8

puts 'Old records destroyed'

User.create(:email => "admin@test.com",
            :password => "password",
            :password_confirmation => "password",
            :user_type => "admin")

puts 'Created test admin [:email => admin@test.com, :password => password]'

User.create(:email => "curator@test.com",
            :password => "password",
            :password_confirmation => "password",
            :user_type => "curator")

puts 'Created test curator [:email => curator@test.com, :password => password]'

(2 * MULTIPLIER).times do
  User.create(:email => Faker::Internet.email,
              :password => "password",
              :password_confirmation => "password",
              :user_type => "curator")
end

puts 'Created random curators'

(5).times do
  Sector.create(:title => Faker::Book.genre)
end

puts 'Sectors Created'

Sector.all.each do |sector|
  (rand(MULTIPLIER / 2) + 2).times do
    sector.collections.create(:title => Faker::Company.buzzword,
                              :description => Faker::Lorem.sentence(3, true, 6),
                              :created_at => rand(Time.now - sector.created_at).seconds.ago)
  end
end

puts 'Collections Created'

User.all.each do |user|
  (rand(MULTIPLIER) + 1).times do
    collection_id = rand(Collection.all.length) + 1
    user.resources.create(:title => Faker::Lorem.sentence(2, true, 3).chomp('.'),
                          :url => Faker::Internet.url('test.com'),
                          :description => Faker::Lorem.sentence(4, true, 7),
                          :upvotes => rand(49) + 1,
                          :collection_id => collection_id,
                          :created_at => rand(Time.now - user.created_at).seconds.ago)
  end
end

puts 'Resources Created'

User.create(:email => "reader@test.com",
            :password => "password",
            :password_confirmation => "password",
            :user_type => "reader")

puts 'Created test reader [:email => reader@test.com, :password => password]'

(3 * MULTIPLIER).times do
  User.create(:email => Faker::Internet.email,
              :password => "password",
              :password_confirmation => "password",
              :user_type => "reader")
end

puts 'Created random readers'

puts 'SEEDING COMPLETE'