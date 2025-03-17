Rails.application.routes.draw do
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
