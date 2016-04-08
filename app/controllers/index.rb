get '/' do
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
  puts params[:id]
  @cases = Case.where(ward: params[:id])
  if request.xhr?
     puts "indide ajax"
     erb :'_ward_show', locals: { cases: @cases}, :layout => false
  end
end
