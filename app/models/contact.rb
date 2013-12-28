class Contact < ActiveRecord::Base
  validates :first_name, :presence => true
  validates :last_name, :length => { :minimum => 2 }
  validates :phone_number, :uniqueness => true, :allow_blank => true
end
