# frozen_string_literal: true

class GithubScraper < ApplicationService
  class GithubScraperError < StandardError; end
  class ProfileNotFoundError < GithubScraperError; end
  class NetworkError < GithubScraperError; end
  class InvalidURLError < GithubScraperError; end

  def initialize(url_or_username)
    @input = url_or_username.to_s.strip
    process_input
  end

  def call  
    scrape_profile
  end

  private

  def process_input
    @url, @username, @profile_page = GithubScraper::InputHandler.new(@input)
      .normalize
      .validate
      .extract_username
      .load_profile_page
  end

  def scrape_profile
    GithubScraper::ProfileHandler.new(
      @profile_page, 
      @url,
      @username,
      ->(url) { make_request(url) }
    ).serialize
  end

  def make_request(url)
    GithubScraper::RequestHandler.make_request(url)
  end
end
