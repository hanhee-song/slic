class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  helper_method :current_user, :logged_in?
  
  def current_user
    if !@current_user
      user = User.find_by(id: session[:user_id])
      if user && ActiveSupport::SecurityUtils.secure_compare(user.session_token, session[:session_token])
        @current_user = user
      end
    end
    @current_user
  end
  
  def logged_in?
    !!current_user
  end
  
  def login!(user)
    session[:session_token] = user.reset_token!
    session[:user_id] = user.id
    @current_user = user
  end
  
  def logout!
    current_user.reset_token!
    current_user = nil
    session[:session_token] = nil
    session[:user_id] = nil
  end
  
  def ensure_login
    if !current_user
      render json: ["Please log in"], status: 403
    end
  end
end
