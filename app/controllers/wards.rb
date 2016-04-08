get '/wards/:id' do
  puts params[:id]
  @cases = Case.where(ward: params[:id])
  if request.xhr?
     puts "indide ajax"
     erb :'_ward_show', locals: { cases: @cases}, :layout => false
  end
end
