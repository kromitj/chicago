class CreateWards < ActiveRecord::Migration
  def change
    create_table :wards do |t|
      t.name
    end
  end
end
