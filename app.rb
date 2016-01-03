require 'bundler'
Bundler.require

get '/' do
  redirect to 'index.html'
end

get '/db' do
  stream do |out|
    File.open('words') do |file|
      while !file.eof?
        buffer = file.readline
        out << buffer
      end
    end
  end
end