Rails.application.routes.draw do

  devise_for :users
  root 'evergreen#index'

end
