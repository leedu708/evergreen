Rails.application.routes.draw do

  devise_for :users
  root 'evergreen#index'

  scope 'api' do
    namespace :admin do
      resources :users, :only => [:index, :show, :update]
    end
    resources :users, :only => [:index]
    resources :sectors, :only => [:index, :create, :update, :destroy]
    resources :categories, :only => [:index, :create, :update, :destroy]
    resources :collections, :only => [:index, :create, :update, :destroy]
    resources :resources, :only => [:index, :create]
  end

end