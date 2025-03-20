module GithubScraper
  class GithubScraperError < StandardError; end
  class ProfileNotFoundError < GithubScraperError; end
  class NetworkError < GithubScraperError; end
  class InvalidURLError < GithubScraperError; end
end
