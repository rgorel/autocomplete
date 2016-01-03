require 'bundler'
Bundler.require

get '/' do
  redirect to 'index.html'
end

get '/db' do
  stream do |out|
    File.open('words') do |file|
      while buffer = file.read(4096)
        out << buffer
      end
    end
  end
end