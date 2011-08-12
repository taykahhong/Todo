class CreateItems < ActiveRecord::Migration
  def self.up
    create_table :items do |t|
      t.string :task
      t.boolean :done
      t.string :status

      t.timestamps
    end
  end

  def self.down
    drop_table :items
  end
end
