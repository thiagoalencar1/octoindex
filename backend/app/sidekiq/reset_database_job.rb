require 'sidekiq-scheduler'

class ResetDatabaseJob
  include Sidekiq::Job

  def perform
    clean_database
    populate_database
  end

  private

  def clean_database
    GithubProfile.delete_all
  end

  def populate_database
    Rails.application.load_seed
  end
end
