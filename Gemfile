source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.4'
# Use sqlite3 as the database for Active Record
gem 'sqlite3'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'

# Use jquery as the JavaScript library
gem 'jquery-rails'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# For images and videos
gem "paperclip", "~> 4.3"

group :production do
  # For the secret key base in config/secret.yml
  gem 'dotenv-rails'
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger 
  # console
  gem 'byebug'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in 
  # views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the 
  # background. Read more: https://github.com/rails/spring
  gem 'spring'

  # Capistrano
  gem 'capistrano', '~> 3.1'
  gem 'capistrano-bundler', '~> 1.1'
  gem 'capistrano-rails', '~> 1.1.5'
  gem 'capistrano-rbenv', github: "capistrano/rbenv"
end

