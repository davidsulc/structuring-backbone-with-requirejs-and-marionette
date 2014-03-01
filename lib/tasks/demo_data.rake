require 'ffaker'

namespace :fake do
  desc 'Create some fake contacts'
  task :contacts => :environment do
    Contact.delete_all

    Contact.create! do |c|
      c.first_name = "Alice"
      c.last_name = "Arten"
      c.phone_number = "555-0184"
    end

    Contact.create! do |c|
      c.first_name = "Bob"
      c.last_name = "Brigham"
      c.phone_number = "555-0163"
    end

    Contact.create! do |c|
      c.first_name = "Charlie"
      c.last_name = "Campbell"
      c.phone_number = "555-0129"
    end

    500.times do
      Contact.create do |c|
        c.first_name = Faker::Name.first_name
        c.last_name = Faker::Name.last_name
        c.phone_number = Faker::PhoneNumber.phone_number
      end
    end

    # create relationships between contacts
    Contact.all.each do |c|
      rand(9).times do |i|
        acquaintance = Contact.first(:offset => rand(Contact.count))
        c.acquaintances << acquaintance if acquaintance.id != c.id
      end
    end
  end
end
