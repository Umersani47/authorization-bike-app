# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token


  respond_to :json
  # def create
  #   resource = warden.authenticate!(auth_options)
  #   sign_in(resource_name, resource)
  #   render json: {
  #     message: 'Logged in successfully.',
  #     token: current_token
  #   }, status: :ok
  # end
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
