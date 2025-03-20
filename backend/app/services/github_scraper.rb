# frozen_string_literal: true

class GithubScraper < ApplicationService
  class GithubScraperError < StandardError; end
  class ProfileNotFoundError < GithubScraperError; end
  class NetworkError < GithubScraperError; end
  class InvalidURLError < GithubScraperError; end

  GITHUB_URL_PATTERN = %r{\A(?:https?://)?github\.com/[\w-]+/?+\z}
  USERNAME_PATTERN = %r{\A[\w-]+\z}

  SELECTORS = {
    name: '.p-name.vcard-fullname.d-block',
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
    return github_username_to_url(input) if username?(input)
    return normalize_github_url(input) if github_url?(input)
    input
  end

  def username?(input)
    input.match?(USERNAME_PATTERN) && !input.include?('/')
  end

  def github_url?(input)
    input.match?(GITHUB_URL_PATTERN)
  end

  def github_username_to_url(username)
    "https://github.com/#{username}"
  end

  def normalize_github_url(url)
    if url.start_with?('http://', 'https://')
      url
    else
      "https://#{url}"
    end
  end

  def profile_serializer
    {
      name: @profile_page.css(SELECTORS[:name]).text.strip,
      username: @profile_page.css(SELECTORS[:username]).text.strip,
      url: @url,
      short_url: ZipUrl.new(@url).call,
      followers: @profile_page.css(SELECTORS[:followers]).text.strip,
      following: @profile_page.css(SELECTORS[:following]).text.strip,
      stars: @profile_page.css(SELECTORS[:stars]).first&.text&.strip || 0,
      contributions: fetch_contributions,
      image_url: @profile_page.css(SELECTORS[:profile_image]).first['src'].split("?").first,
      organization: @profile_page.css(SELECTORS[:organization]).text.strip.presence,
      location: @profile_page.css(SELECTORS[:location]).text.strip.presence
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
    GithubScraper::RequestHandler.make_request(url)
  end
end
