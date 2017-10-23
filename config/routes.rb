Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  
  namespace :api, defaults: { format: 'json' } do
    resources :users, only: [:create, :update]
    resources :session, only: [:create, :destroy]
  end
  
  namespace :api do
    get 'sessions/create'
  end

  namespace :api do
    get 'sessions/destroy'
  end

  namespace :api do
    get 'users/create'
  end

  namespace :api do
    get 'users/update'
  end

  namespace :api do
    get 'users/show'
  end

  namespace :api do
    get 'users/destroy'
  end

end
