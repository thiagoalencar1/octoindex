require 'rails_helper'
require 'sidekiq/testing'

RSpec.describe ResetDatabaseJob, type: :job do
  describe '#perform' do
    before do
      Sidekiq::Testing.inline!

      GithubProfile.create(username: 'test_user1')
      GithubProfile.create(username: 'test_user2')
    end

    after do
      Sidekiq::Testing.fake!
    end

    it 'cleans the database' do
      expect(GithubProfile.count).to eq(2)
      
      allow_any_instance_of(ResetDatabaseJob).to receive(:populate_database)
      
      ResetDatabaseJob.new.perform
      
      expect(GithubProfile.count).to eq(0)
    end

    it 'populates the database with seed data' do
      expect(Rails.application).to receive(:load_seed)
      allow_any_instance_of(ResetDatabaseJob).to receive(:clean_database)
      
      ResetDatabaseJob.new.perform
    end
  end
end
