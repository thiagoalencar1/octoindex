class ZipUrl
  attr_reader :url

  def initialize(url)
    @url = url
  end

  def call
    response = client.shorten(long_url: @url)
    response.link
  rescue StandardError => e
    Rails.logger.error "Error shortening URL: #{e.message}"
  end

  private

  def client
    client ||= Bitly::API::Client.new(token: ENV.fetch('BITLY_TOKEN'))
  end
end
