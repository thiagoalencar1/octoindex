class CreateGithubProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :github_profiles do |t|
      t.string :username
      t.string :url

      t.timestamps
    end
  end
end
