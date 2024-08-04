# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { message: 'Signed up successfully.', user: resource }, status: :ok
    else
      render json: { message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }, status: :unprocessable_entity
    end
  end
end
