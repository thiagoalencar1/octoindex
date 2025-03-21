class Api::V1::GithubProfilesController < ApplicationController
  before_action :set_github_profile, only: %i[ show update destroy ]

  # GET /github_profiles
  def index
    @github_profiles = GithubProfile.all

    render json: @github_profiles
  end

  # GET /github_profiles/username
def show
  if @github_profile
    render json: @github_profile
  else
    render json: { error: "GitHub profile not found" }, status: :not_found
  end
end

  # POST /github_profiles
  def create
    url_or_username = github_profile_params[:url_or_username]
    scraped_profile = GithubScraper.new(url_or_username).call

    @github_profile = GithubProfile.find_or_initialize_by(username: scraped_profile[:username])
    @github_profile.assign_attributes(scraped_profile)

    if @github_profile.save
      render json: @github_profile, status: :created
    else
      render json: @github_profile.errors, status: :unprocessable_entity
    end
  rescue GithubScraper::GithubScraperError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def search
    query = params[:query].to_s.strip
    
    if query.present?
      @github_profiles = GithubProfile.search_by_attributes(query)
    else
      @github_profiles = GithubProfile.none
    end
    
    render json: @github_profiles
  end

  # PATCH/PUT /github_profiles/username
  def update
    if @github_profile.update(github_profile_params)
      render json: @github_profile
    else
      render json: @github_profile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /github_profiles/username
  def destroy
    @github_profile.destroy!
  end

  private
    def set_github_profile
      @github_profile = GithubProfile.find_by(username: params[:username])
    end

    def github_profile_params
      if params[:github_profile] and params[:github_profile][:url_or_username]
        params.require(:github_profile).permit(permitted_params)
      else
        params.permit(permitted_params)
      end
    end

    def permitted_params
      [
        :url_or_username, :username, :name, :location, :organization, :followers,
        :following, :stars, :contributions, :image_url, :url, :short_url
      ]
    end
end
