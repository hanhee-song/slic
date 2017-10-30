Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  
  namespace :api, defaults: { format: 'json' } do
    resources :users, only: [:create, :update, :index]
    resource :session, only: [:create, :destroy]
    
    resources :channels, only: [:create, :show, :index, :update, :destroy]
    
    resources :messages, only: [:create, :show, :index]
  end
end
