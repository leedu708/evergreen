Rails.application.routes.draw do

  devise_for :users
  root 'evergreen#index'

  scope 'api' do
    namespace :admin do
      resources :users, :only => [:index, :show, :update]
      resources :site_info, :only => [:index, :update]
    end
    resources :users, :only => [:index] do
      resources :resources, :only => [:index, :show, :destroy]
    end
    resources :sectors do
      collection do
        get 'overview'
      end
    end
    resources :categories, :only => [:index, :create, :update, :destroy]
    resources :collections, :only => [:index, :create, :update, :destroy] do
      resources :resources, :only => [:index]
    end
    resources :resources, :only => [:index, :create, :update] do
      post 'upvote', :on => :member
    end
  end

end