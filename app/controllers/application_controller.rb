class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :null_session

  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last
    return render json: { error: 'Token missing' }, status: :unauthorized if token.blank?

    payload, _header = JWT.decode(token, Rails.application.credentials.dig(:devise, :jwt_secret_key), true, algorithm: 'HS256')
    @current_user = User.find(payload['sub'])
    render json: { error: 'Invalid token' }, status: :unauthorized unless @current_user
  rescue JWT::DecodeError
    render json: { error: 'Invalid token' }, status: :unauthorized
  end

  def has_permission?(permission_name)
    @current_user.has_permission?(permission_name)
  end

  def has_admin_permissions?
    @current_user.is_admin?
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:role])
    devise_parameter_sanitizer.permit(:account_update, keys: [:role])
  end
end
