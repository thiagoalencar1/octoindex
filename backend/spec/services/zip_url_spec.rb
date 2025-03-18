require 'rails_helper'

RSpec.describe ZipUrl do
  describe '#call' do
    it 'returns a shortened URL' do
      url = 'https://github.com/octocat'
      shortened_url = 'https://tinyurl.com/abc123'
      
      response = double('Response', body: shortened_url)
      expect(TinyurlShortener).to receive(:shorten).with(url).and_return(response)
      
      result = ZipUrl.new(url).call
      expect(result).to eq(shortened_url)
    end
    
    it 'logs an error when shortening fails' do
      url = 'https://github.com/octocat'
      error_message = 'API error'
      
      expect(TinyurlShortener).to receive(:shorten).with(url).and_raise(StandardError.new(error_message))
      expect(Rails.logger).to receive(:error).with("Error shortening URL: #{error_message}")
      
      result = ZipUrl.new(url).call
      expect(result).to be_nil
    end
  end
end
