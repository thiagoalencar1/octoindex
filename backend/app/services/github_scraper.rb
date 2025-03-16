# frozen_string_literal: true

class GithubScraper < ApplicationService
  class GithubScraperError < StandardError; end
  class ProfileNotFoundError < GithubScraperError; end
  class NetworkError < GithubScraperError; end
  class InvalidURLError < GithubScraperError; end

  GITHUB_URL_PATTERN = %r{\A(?:https?://)?github\.com/[\w-]+/?+\z}
  USERNAME_PATTERN = %r{\A[\w-]+\z}

  SELECTORS = {
    username: '.p-nickname.vcard-username.d-block',
    followers: 'a[href$="tab=followers"] .text-bold',
    following: 'a[href$="tab=following"] .text-bold',
    stars: 'a[data-tab-item="stars"] .Counter',
    profile_image: '.avatar-user',
    organization: '.p-org',
    location: '.p-label',
    contributions: '.js-yearly-contributions h2.text-normal'
  }.freeze

  def initialize(url_or_username)
    @input = url_or_username.to_s.strip
    @url = normalize_input(@input)
    validate_input!
    @username = @url.split('/').last
    @profile_page = fetch_profile_page
  end

  def call
    profile_serializer
  end

  private

  def normalize_input(input)
    if input.match?(USERNAME_PATTERN) && !input.include?('/')
      "https://github.com/#{input}"
    elsif input.match?(GITHUB_URL_PATTERN)
      if input.start_with?('http://', 'https://')
        input
      else
        "https://#{input}"
      end
    else
      input
    end
  end

  def profile_serializer
    {
      username: @profile_page.css(SELECTORS[:username]).text.strip,
      url: @url,
      short_url: "short_url", # ZipUrl.new(@url).call
      followers: @profile_page.css(SELECTORS[:followers]).text.strip,
      following: @profile_page.css(SELECTORS[:following]).text.strip,
      stars: @profile_page.css(SELECTORS[:stars]).first&.text&.strip || 0,
      contributions: fetch_contributions,
      image_url: @profile_page.css(SELECTORS[:profile_image]).first['src'].split("?").first,
      # organization: @profile_page.css(SELECTORS[:organization]).text.strip.presence,
      # location: @profile_page.css(SELECTORS[:location]).text.strip.presence
    }
  end

  def fetch_profile_page
    github_response = make_request(@url)
    Nokogiri::HTML(github_response.body)
  end

  def fetch_contributions
    contributions_url = "https://github.com/users/#{@username}/contributions"
    contributions_response = make_request(contributions_url)
    
    return "0" if contributions_response.body.nil? || contributions_response.body.empty?

    contributions_page = Nokogiri::HTML(contributions_response.body)
    contributions_text = contributions_page.css(SELECTORS[:contributions]).text.strip
    contributions_text.split.first.gsub(/[.,]/, '')
  end

  def validate_input!
    raise InvalidURLError, "Input cannot be blank" if @input.blank?

    unless @url.match?(%r{\Ahttps://github\.com/[\w-]+/?+\z})
      raise InvalidURLError, "Invalid GitHub profile format: #{@input}"
    end
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
