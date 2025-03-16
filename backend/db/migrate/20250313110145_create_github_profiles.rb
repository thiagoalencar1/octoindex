class CreateGithubProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :github_profiles do |t|
      t.string :name
      t.string :username
      t.string :url
      t.string :short_url
      t.integer :followers
      t.integer :following
      t.integer :stars
      t.integer :contributions
      t.string :image_url
      t.string :location
      t.string :organization

      t.timestamps
    end
  end
end
