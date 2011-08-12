class Item < ActiveRecord::Base
  attr_accessible :task, :done, :status

  def to_json(options = {})
    super(options.merge(:only => [ :id, :task, :created_at, :done, :status ]))
  end
end
