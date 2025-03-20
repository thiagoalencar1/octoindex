class GithubScraper
  class RequestHandler
    def self.make_request(url)
      new.make_request(url)
    end
    
    def make_request(url)
      response = Faraday.get(url)
      
      case response.status
      when 200
        response
      when 404
        raise ProfileNotFoundError, "GitHub profile not found for URL: #{url}"
      when 400..499
        raise GithubScraperError, "Client error: #{response.status} for URL: #{url}"
      when 500..599
        raise GithubScraperError, "Server error: #{response.status} for URL: #{url}"
      end
    rescue Faraday::ConnectionFailed => e
      raise NetworkError, "Network error while connecting to GitHub: #{e.message}"
    rescue Faraday::TimeoutError => e
      raise NetworkError, "Request timed out: #{e.message}"
    rescue Faraday::Error => e
      raise GithubScraperError, "Error fetching data from GitHub: #{e.message}"
    end
  end
end
