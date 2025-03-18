require 'rails_helper'

RSpec.describe GithubProfile, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      github_profile = GithubProfile.new(username: 'testuser', url: 'https://github.com/testuser')
      expect(github_profile).to be_valid
    end

    it 'is not valid without a username' do
      github_profile = GithubProfile.new(url: 'https://github.com/testuser')
      expect(github_profile).not_to be_valid
      expect(github_profile.errors[:username]).to include("can't be blank")
    end

    it 'is not valid with a duplicate username' do
      GithubProfile.create(username: 'testuser', url: 'https://github.com/testuser')
      github_profile = GithubProfile.new(username: 'testuser', url: 'https://github.com/anotheruser')
      expect(github_profile).not_to be_valid
      expect(github_profile.errors[:username]).to include("has already been taken")
    end
  end
end
