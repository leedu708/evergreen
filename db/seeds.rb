# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all

MULTIPLIER = 5

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

User.create(:email => "reader@test.com",
            :password => "password",
            :password_confirmation => "password",
            :user_type => "reader")

puts 'Created test reader [:email => reader@test.com, :password => password]'

(2 * MULTIPLIER).times do
  User.create(:email => Faker::Internet.email,
              :password => "password",
              :password_confirmation => "password",
              :user_type => "curator")
end

puts 'Created random curators'

(5 * MULTIPLIER).times do
  User.create(:email => Faker::Internet.email,
              :password => "password",
              :password_confirmation => "password",
              :user_type => "reader")
end

puts 'Created random readers'

puts 'SEEDING COMPLETE'