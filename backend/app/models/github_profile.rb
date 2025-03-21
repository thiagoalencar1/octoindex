class GithubProfile < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  
  scope :search_by_attributes, ->(query) {
    where(["name ILIKE ? OR username ILIKE ? OR location ILIKE ? OR organization ILIKE ?", 
         "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%"])
  }
end
