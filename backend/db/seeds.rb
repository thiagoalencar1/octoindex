# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

[
  {
    name: "Fabio Akita",
    username: "akitaonrails",
    url: "https://github.com/akitaonrails",
    short_url: "https://tinyurl.com/27sg5gcg",
    followers: 10,
    following: 4,
    stars: 1,
    contributions: 10,
    image_url: "https://avatars.githubusercontent.com/u/2840",
    location: "Brazil",
    organization: "Codeminer 42"
  },
  {
    name: "David Heinemeier Hansson",
    username: "dhh",
    url: "https://github.com/dhh",
    short_url: "https://tinyurl.com/7zt9lfj",
    followers: 20,
    following: 0,
    stars: 17,
    contributions: 1406,
    image_url: "https://avatars.githubusercontent.com/u/2741",
    location: nil,
    organization: "37signals"
  },
  {
    name: "Linus Torvalds",
    username: "torvalds",
    url: "https://github.com/torvalds",
    short_url: "https://tinyurl.com/3hy99xc",
    followers: 229,
    following: 0,
    stars: 2,
    contributions: 2806,
    image_url: "https://avatars.githubusercontent.com/u/1024025",
    location: "Portland, OR",
    organization: "Linux Foundation"
  },
  {
    name: "The Octocat",
    username: "octocat",
    url: "https://github.com/octocat",
    short_url: "https://tinyurl.com/29qdkmao",
    followers: 17,
    following: 9,
    stars: 4,
    contributions: 0,
    image_url: "https://avatars.githubusercontent.com/u/583231",
    organization: "@github",
    location: "San Francisco"
  },
  {
    name: "Yukihiro \"Matz\" Matsumoto",
    username: "matz",
    url: "https://github.com/matz",
    short_url: "https://tinyurl.com/ybt532ht",
    followers: 9,
    following: 0,
    stars: 18,
    contributions: 771,
    image_url: "https://avatars.githubusercontent.com/u/30733",
    location: "Matsue, Japan\n  06:44\n  (UTC +09:00)",
    organization: "Ruby Association,NaCl"
  },
  {
    name: "Thiago Alencar",
    username: "thiagoalencar1",
    url: "https://github.com/thiagoalencar1",
    short_url: "https://tinyurl.com/29nw5f8w",
    followers: 15,
    following: 35,
    stars: 13,
    contributions: 1111,
    image_url: "https://avatars.githubusercontent.com/u/14118336",
    organization: nil,
    location: "Brazil"
  },
  {
    name: "Rodrigo Serradura",
    username: "serradura",
    url: "https://github.com/serradura",
    short_url: "https://tinyurl.com/2ddkcc4z",
    followers: 556,
    following: 43,
    stars: 237,
    contributions: 900,
    image_url: "https://avatars.githubusercontent.com/u/305364",
    location: "Brazil, São Paulo",
    organization: nil
  },
  {
    name: "Felipe Lôbo",
    username: "felipeblobo",
    url: "https://github.com/felipeblobo",
    short_url: "https://tinyurl.com/2c77vdyl",
    followers: 68,
    following: 56,
    stars: 47,
    contributions: 835,
    image_url: "https://avatars.githubusercontent.com/u/69439442",
    location: "Salvador, Bahia.",
    organization: "QuintoAndar"
  },
  {
    name: "Mike Zornek",
    username: "zorn",
    url: "https://github.com/zorn",
    short_url: "https://tinyurl.com/2596ucak",
    followers: 94,
    following: 49,
    stars: 896,
    contributions: 367,
    image_url: "https://avatars.githubusercontent.com/u/52168",
    location: "Philadelphia, PA\n  17:54\n  (UTC -04:00)",
    organization: "Zorn Labs LLC",
  }
].shuffle.each do |user|
  GithubProfile.find_or_create_by!(user)
end
