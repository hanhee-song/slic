Rails.application.routes.draw do
  get 'messages/create'

  get 'messages/show'

  get 'messages/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  
  namespace :api, defaults: { format: 'json' } do
    resources :users, only: [:create, :update]
    resource :session, only: [:create, :destroy]
    
    resources :channels, only: [:create, :show, :index, :update, :destroy]
  end
end
