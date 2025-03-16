require 'rails_helper'

RSpec.describe "/api/v1/github_profiles", type: :request do
  let(:valid_github_url) { 'https://github.com/example'}

  let(:invalid_github_url) { 'https://github.com/example/invalid' }

  let(:valid_headers) do
    { 'Content-Type' => 'application/json' }
  end

  let(:valid_attributes) do
    {
      username: 'example',
      url: valid_github_url
    } 
  end

  describe "GET /index" do
    it "renders a successful response" do
      GithubProfile.create!(valid_attributes)
      get api_v1_github_profiles_path, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      github_profile = GithubProfile.create!(valid_attributes)
      get api_v1_github_profile_path(github_profile), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new GithubProfile" do
        expect {
          post api_v1_github_profiles_path,
               params: { github_profile: { url_or_username: valid_github_url } }, headers: valid_headers, as: :json
        }.to change(GithubProfile, :count).by(1)
      end

      it "renders a JSON response with the new github_profile" do
        post api_v1_github_profiles_path,
             params: { github_profile: { url_or_username: valid_github_url } }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new GithubProfile" do
        expect {
          post api_v1_github_profiles_path,
               params: { github_profile: { url_or_username: invalid_github_url } }, headers: valid_headers, as: :json
        }.to change(GithubProfile, :count).by(0)
      end

      it "renders a JSON response with errors for the new github_profile" do
        post api_v1_github_profiles_path,
             params: { github_profile: { url_or_username: invalid_github_url } }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  xdescribe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested github_profile" do
        github_profile = GithubProfile.create!(valid_attributes)
        patch api_v1_github_profile_path(github_profile),
              params: { github_profile: new_attributes }, headers: valid_headers, as: :json
        github_profile.reload
        skip("Add assertions for updated state")
      end

      it "renders a JSON response with the github_profile" do
        github_profile = GithubProfile.create!(valid_attributes)
        patch github_profile_url(github_profile),
              params: { github_profile: new_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the github_profile" do
        github_profile = GithubProfile.create!(valid_attributes)
        patch github_profile_url(github_profile),
              params: { github_profile: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested github_profile" do
      github_profile = GithubProfile.create!(valid_attributes)
      expect {
        delete api_v1_github_profile_path(github_profile), headers: valid_headers, as: :json
      }.to change(GithubProfile, :count).by(-1)
    end
  end
end
