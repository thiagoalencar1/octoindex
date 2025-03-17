require 'rails_helper'

RSpec.describe GithubScraper do
  let(:valid_url) { 'https://github.com/validuser' }
  let(:scraper) { described_class.new(valid_url) }

  describe '#initialize' do
    context 'when given a valid URL' do
      it 'initializes without errors' do
        expect { scraper }.not_to raise_error
      end
    end

    context 'when given an invalid URL' do
      it 'raises InvalidURLError for blank URL' do
        expect { described_class.new('') }.to raise_error(GithubScraper::InvalidURLError)
      end

      it 'raises InvalidURLError for incorrect format' do
        expect { described_class.new('http://hubgit.com/user') }.to raise_error(GithubScraper::InvalidURLError)
      end
    end
  end

  describe '#profile_serializer' do
    before do
      allow(scraper).to receive(:fetch_profile_page).and_return(Nokogiri::HTML('<html></html>'))
      allow(scraper).to receive(:fetch_contributions).and_return('10')
      allow(scraper).to receive(:username).and_return('validuser')
      allow(scraper).to receive(:followers).and_return(100)
      allow(scraper).to receive(:following).and_return(50)
      allow(scraper).to receive(:stars).and_return(5)
      allow(scraper).to receive(:image_url).and_return('https://example.com/image.jpg')
      allow(scraper).to receive(:organization).and_return('Example Org')
      allow(scraper).to receive(:location).and_return('Example Location')
    end

    xit 'returns a hash with profile data' do
      profile_data = scraper.send(:profile_serializer)

      expect(profile_data).to include(
        username: 'validuser',
        followers: 100,
        following: 50,
        stars: 5,
        contributions: '10',
        image_url: 'https://example.com/image.jpg',
        organization: 'Example Org',
        location: 'Example Location'
      )
    end
  end

  describe '#fetch_contributions' do
    context 'when contributions page is accessible' do
      it 'returns the number of contributions' do
        html = '<html><div class="js-yearly-contributions"><h2 class="text-normal">10 contributions</h2></div></html>'
        allow(scraper).to receive(:make_request).and_return(double(body: html))
        
        contributions = scraper.send(:fetch_contributions)
        expect(contributions).to eq('10')
      end
    end

    context 'when contributions page is not accessible' do
      it 'returns "0" if the response body is empty' do
        allow(scraper).to receive(:make_request).and_return(double(body: ''))
        contributions = scraper.send(:fetch_contributions)
        expect(contributions).to eq('0')
      end
    end
  end

  describe '#make_request' do
    context 'when the request is successful' do
      it 'returns the response' do
        response = double('response', status: 200, body: 'response body')
        allow(Faraday).to receive(:get).with(valid_url).and_return(response)

        result = scraper.send(:make_request, valid_url)
        expect(result).to eq(response)
      end
    end

    context 'when the profile is not found' do
      it 'raises ProfileNotFoundError' do
        response = double('response', status: 404)
        allow(Faraday).to receive(:get).with(valid_url).and_return(response)

        expect { scraper.send(:make_request, valid_url) }.to raise_error(GithubScraper::ProfileNotFoundError)
      end
    end

    context 'when there is a client error' do
      it 'raises GithubScraperError' do
        response = double('response', status: 400)
        allow(Faraday).to receive(:get).with(valid_url).and_return(response)

        expect { scraper.send(:make_request, valid_url) }.to raise_error(GithubScraper::GithubScraperError)
      end
    end

    context 'when there is a server error' do
      it 'raises GithubScraperError' do
        response = double('response', status: 500)
        allow(Faraday).to receive(:get).with(valid_url).and_return(response)

        expect { scraper.send(:make_request, valid_url) }.to raise_error(GithubScraper::GithubScraperError)
      end
    end

    context 'when there is a network error' do
      it 'raises NetworkError' do
        allow(Faraday).to receive(:get).and_raise(Faraday::ConnectionFailed.new('Connection failed'))

        expect { scraper.send(:make_request, valid_url) }.to raise_error(GithubScraper::NetworkError)
      end
    end
  end
end
