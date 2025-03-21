class GithubScraper
  class InputHandler
    attr_reader :url, :username, :profile

    GITHUB_URL_PATTERN = %r{\A(?:https?://)?github\.com/[\w-]+/?+\z}
    USERNAME_PATTERN = %r{\A[\w-]+\z}

    def initialize(input)
      @input = input
    end

    def normalize
      @url = github_username_to_url(@input) if username?(@input)
      @url = normalize_github_url(@input) if github_url?(@input)
      @url ||= @input
      self
    end

    def validate
      raise InvalidURLError, "Input cannot be blank" if @input.blank?
      unless @url.match?(%r{\Ahttps://github\.com/[\w-]+/?+\z})
        raise InvalidURLError, "Invalid GitHub profile format: #{@input}"
      end
      self
    end

    def extract_username
      @username = @url.split('/').last
      self
    end

    def load_profile_page
      github_response = GithubScraper::RequestHandler.make_request(@url)
      @profile_page = Nokogiri::HTML(github_response.body)
      
      [@url, @username, @profile_page]
    end

    private
    
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
  end
end
