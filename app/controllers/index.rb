get '/' do
  erb :'home'
end

get '/cases' do
  @case = Case.all
   @crimes_per_ward = @case.crimes_per_ward
  erb :'index'
end

get '/cases/wards' do
  @crimes_per_ward = Case.crimes_per_ward
  puts "Crimes: #{@crimes_per_ward}"
  if request.xhr?
    puts "indide ajax"
    content_type :json
    puts @crimes_per_ward.to_json
    @crimes_per_ward.to_json
  else
    redirect '/'
  end
end

get '/cases/:id' do
  puts "inside cases/:id"
  @case = Case.find(params[:id])
  puts @case.primary_decsription
  if request.xhr?
    erb :'/cases/_show' , locals: { _case: @case}, :layout => false
  else
    redirect '/'
  end
end
