# Load DSL and set up stages
require 'capistrano/setup'

# Include default deployment tasks
require 'capistrano/deploy'

# Rails plugins
require 'capistrano/bundler'
require 'capistrano/rails'

# rbenv plugin
require 'capistrano/rbenv'
set :rbenv_type, :user
set :rbenv_ruby, '2.2.0'

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }
