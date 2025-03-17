class GithubProfile < ApplicationRecord
  validates :username, presence: true, uniqueness: true
end
