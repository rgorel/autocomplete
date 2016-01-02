require 'bundler'
Bundler.require

get '/' do
  redirect to 'index.html'
end

get '/db' do
  json test: 1
end