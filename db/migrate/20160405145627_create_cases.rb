class CreateCases < ActiveRecord::Migration
  def change
    create_table :cases do |t|
      t.string :iucr
      t.string :location_description
      t.string :primary_decsription
      t.string :secondary_description
      t.string :arrest
      t.string :beat
      t.string :block
      t.string :case_num
      t.string :date_of_occurrence
      t.string :domestic
      t.string :fbi_code
      t.string :ward
    end
  end

  def show_self
    ""
  end

end
