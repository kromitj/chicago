require 'net/http'
require 'json'

url = 'https://data.cityofchicago.org/resource/3uz7-d32j.json'
uri = URI(url)
response = Net::HTTP.get(uri)

puts response.class
json = JSON.parse(response)
puts json.class
puts json.first
# puts json["data"][0]


json.each do |case_|
  iucr = case_["_iucr"]
  location_description = case_["_location_description"]
  primary_decsription = case_["_primary_decsription"]
  secondary_description = case_["_secondary_description"]
  arrest = case_["arrest"]
  beat = case_["beat"]
  block = case_["block"]
  case_num = case_["case__"]
  date_of_occurrence = case_["date_of_occurrence"]
  domestic = case_["domestic"]
  fbi_code = case_["fbi_cd"]
  ward = case_["ward"]

  Case.create(iucr: iucr,
    location_description: location_description,
    primary_decsription: primary_decsription,
    secondary_description: secondary_description,
    arrest: arrest,
    beat: beat,
    block: block,
    case_num: case_num,
    date_of_occurrence: date_of_occurrence,
    domestic: domestic,
    fbi_code: fbi_code,
    ward: ward)
end



