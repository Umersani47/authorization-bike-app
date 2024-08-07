class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :check_permissions
  skip_before_action :authenticate_user!

  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { message: 'Signed up successfully.', user: resource }, status: :ok
    else
      render json: { message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }, status: :unprocessable_entity
    end
  end
end
