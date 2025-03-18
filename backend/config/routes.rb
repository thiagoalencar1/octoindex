require "sidekiq/web"

Rails.application.routes.draw do
  mount Sidekiq::Web => "/sidekiq"

  get "up" => "rails/health#show", as: :rails_health_check
  

  namespace :api do
    namespace :v1 do
      resources :github_profiles, param: :username do
        collection do
          get :search
        end
      end
    end
  end
end
