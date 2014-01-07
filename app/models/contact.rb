class Contact < ActiveRecord::Base
  validates :first_name, :presence => true
  validates :last_name, :length => { :minimum => 2 }
  validates :phone_number, :uniqueness => true, :allow_blank => true

  def to_builder
    Jbuilder.new do |json|
      json.extract! self, :id, :first_name, :last_name, :phone_number, :created_at, :updated_at
    end
  end

  def as_json(options={})
    to_builder.attributes!
  end

  def to_json(options={})
    to_builder.target!
  end
end
