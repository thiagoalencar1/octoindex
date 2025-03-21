class GithubScraper
  class ProfileHandler
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
    
    attr_reader :profile_page, :url, :username, :request_handler
    
    def initialize(profile_page, url, username, request_handler)
      @profile_page = profile_page
      @url = url
      @username = username
      @request_handler = request_handler
    end
    
    def serialize
      {
        name: extract_text(SELECTORS[:name]),
        username: extract_text(SELECTORS[:username]),
        url: url,
        short_url: generate_short_url,
        followers: extract_text(SELECTORS[:followers]),
        following: extract_text(SELECTORS[:following]),
        stars: extract_stars,
        contributions: fetch_contributions,
        image_url: extract_image_url,
        organization: extract_optional_text(SELECTORS[:organization]),
        location: extract_optional_text(SELECTORS[:location])
      }
    end
    
    private
    
    def extract_text(selector)
      profile_page.css(selector).text.strip
    end
    
    def extract_optional_text(selector)
      text = extract_text(selector)
      text.presence
    end
    
    def extract_stars
      stars_element = profile_page.css(SELECTORS[:stars]).first
      stars_element&.text&.strip || "0"
    end
    
    def extract_image_url
      profile_page.css(SELECTORS[:profile_image]).first['src'].split("?").first
    end
    
    def generate_short_url
      ZipUrl.new(url).call
    end
    
    def fetch_contributions
      contributions_url = "https://github.com/users/#{username}/contributions"
      contributions_response = request_handler.call(contributions_url)
      
      return "0" if contributions_response.body.nil? || contributions_response.body.empty?

      contributions_page = Nokogiri::HTML(contributions_response.body)
      contributions_text = contributions_page.css(SELECTORS[:contributions]).text.strip
      contributions_text.split.first.gsub(/[.,]/, '')
    end
  end
end
