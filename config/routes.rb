Rails.application.routes.draw do

  devise_for :users
  root 'evergreen#index'

  scope 'api' do
    namespace :admin do
      resources :users, :only => [:index, :update]
    end
    resources :sectors, :only => [:index, :create, :destroy]
    resources :collections, :only => [:index]
    resources :resources, :only => [:index]
  end

end
