class ZipUrl < ApplicationService
  attr_reader :url

  def initialize(url)
    @url = url
  end

  def call
    response = TinyurlShortener.shorten(@url)
    response.body
  rescue StandardError => e
    Rails.logger.error "Error shortening URL: #{e.message}"
  end
end
