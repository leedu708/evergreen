source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.3'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
# gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
# gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

gem "figaro"

# Angular gems
gem 'angularjs-rails'
gem 'angular_rails_csrf'

gem 'binding_of_caller'
gem 'devise'
gem 'twitter-bootstrap-rails'

# gem 'therubyracer'


group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  # gem 'byebug'
  gem 'jazz_hands', github: 'nixme/jazz_hands', branch: 'bring-your-own-debugger'
  gem 'pry-byebug'
  # Access an IRB console on exception pages or by using <%= console %> in views
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'factory_girl_rails'
  gem 'sqlite3'
end

group :development do
  gem 'better_errors'
  gem 'guard-rspec', require: false
  gem 'web-console', '~> 2.0'
  gem 'faker'
end

group :production do
  gem "rails_12factor"
  # Use postgresql as the database for Active Record
	gem 'pg'
end

group :test do 
  gem 'rspec-rails', '~> 3.0'
  gem 'shoulda-matchers', '~> 3.0'
  gem 'shoulda-callback-matchers', '~> 1.1.1'
end