class CreateAcquaintanceships < ActiveRecord::Migration
  def change
    create_table :acquaintanceships do |t|
      t.integer :contact_id
      t.integer :acquaintance_id
    end
  end
end
