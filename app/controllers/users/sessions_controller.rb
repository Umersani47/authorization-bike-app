class Users::SessionsController < Devise::SessionsController
  skip_before_action :check_permissions
  skip_before_action :authenticate_user!

  respond_to :json

  def respond_with(resource, _opts = {})
    render json: { message: 'Signed in successfully', token: current_token }, status: :ok
  end

  def respond_to_on_destroy
    head :no_content
  end

  private

  def current_token
    request.env['warden-jwt_auth.token']
  end

  def respond_to_on_destroy
    head :no_content
  end
end
