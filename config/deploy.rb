#
# Capistrano deployment configuration
#

# config valid only for current version of Capistrano
lock '3.4.0'

# Application name
set :application, 'alysons_quilt'

# Git repo global config
set :scm, :git
set :repo_url, 'git@github.com:MontyCarter/AlysonsQuilt.git'
set :deploy_via, :remote_cache # keep a clone on the server
set :ssh_options, :forward_agent => true # use SSH Agent Fowarding

# User name on server
set :user, "deploy"

# Stages
set :stages, ["development", "production"]
set :default_stage, "development"

namespace :deploy do
  task :restart do
    on roles :all do
      execute :touch, "#{ current_path }/tmp/restart.txt"
    end
  end
end

after 'deploy:publishing', 'deploy:restart'

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5
