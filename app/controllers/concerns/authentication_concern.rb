module AuthenticationConcern
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user!
  end

  private

  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last
    return render json: { error: 'Token missing' }, status: :unauthorized if token.blank?

    payload, _header = JWT.decode(token, Rails.application.credentials.dig(:devise, :jwt_secret_key), true, algorithm: 'HS256')
    @current_user = User.find(payload['sub'])
    render json: { error: 'Invalid token' }, status: :unauthorized unless @current_user
  rescue JWT::DecodeError
    render json: { error: 'Invalid token' }, status: :unauthorized
  end
end
