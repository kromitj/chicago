class Case < ActiveRecord::Base


  def self.crimes_per_ward
    @cases = Case.all
    @wards = Hash.new(0)
    @cases.each do |_case|
      @wards[_case.ward] += 1
    end
    return @wards

  end
  # Remember to create a migration!
end
