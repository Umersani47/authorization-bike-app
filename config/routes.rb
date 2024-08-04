Rails.application.routes.draw do
  use_doorkeeper
  # mount_devise_token_auth_for 'User', at: 'auth'
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do
    namespace :v1 do
      

      resources :users do
        collection do
          get :user_role
        end
      end
      resources :bikes do
        member do
          post :purchase
        end

        collection do 
          get :guest_index
        end
      end
      resources :roles
    end
  end
end
