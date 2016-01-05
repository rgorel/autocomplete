require 'bundler'
Bundler.require

get '/' do
  redirect to 'index.html'
end

get '/db' do
  stream do |out|
    %w(words dvd).each do |file_name|
      File.open(file_name) do |file|
        while !file.eof?
          buffer = file.readline
          out << buffer
        end
      end
    end
  end
end