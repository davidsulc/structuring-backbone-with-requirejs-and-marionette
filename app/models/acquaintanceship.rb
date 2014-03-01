class Acquaintanceship < ActiveRecord::Base  
  belongs_to :contact
  belongs_to :acquaintance, :class_name => 'Contact'

  def to_builder
    Jbuilder.new do |json|
      json.extract! self, :contact_id, :acquaintance_id
    end
  end

  def as_json(options={})
    to_builder.attributes!
  end

  def to_json(options={})
    to_builder.target!
  end
end
