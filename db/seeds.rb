# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#
# Only seed database for non-production envs
#
if not Rails.env.production?

  User.create(
              [].tap do |a|
                16.times do |i|
                  a << { 
                    first_name: "fname#{i + 1}",
                    last_name: "lname#{i + 1}"
                  }
                end
              end

              )

  Square.create(
                [].tap do |a|
                  16.times do |i|
                    a << {
                      message: "This is message #{i + 1}.",
                      users: [ User.find_by(first_name: "fname#{i + 1}") ]
                    }
                  end
                end

                )

end
