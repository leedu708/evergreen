Rails.application.routes.draw do

  devise_for :users
  root 'evergreen#index'

  scope 'api' do
    namespace :admin do
      resources :users, :only => [:index, :update]
    end
  end

end
