class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken

  include AuthenticationConcern
  include PermissionConcern

  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :null_session

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:role])
    devise_parameter_sanitizer.permit(:account_update, keys: [:role])
  end
end
