class Api::V1::RolesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_role, only: [:show, :update, :destroy]
  before_action :authorize_read, only: [:index]
  before_action :authorize_create, only: [:create]
  before_action :authorize_update, only: [:update]
  before_action :authorize_destroy, only: [:destroy]

  def index
    @roles = Role.not_admin
    render json: @roles
  end

  def show
    render json: @role
  end

  def create
    @role = Role.new(role_params)

    if @role.save
      render json: @role, status: :created
    else
      render json: @role.errors, status: :unprocessable_entity
    end
  end

  def update
    if @role.update(role_params)
      render json: @role
    else
      render json: @role.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @role.destroy
    head :no_content
  end

  private

  def set_role
    @role = Role.find(params[:id])
  end

  def role_params
    params.require(:role).permit(:name, permissions: {})
  end

  def authorize_read
    render json: { error: 'Not Authorized' }, status: :forbidden unless has_admin_permissions?
  end

  def authorize_create
    render json: { error: 'Not Authorized' }, status: :forbidden unless has_admin_permissions?
  end

  def authorize_update
    render json: { error: 'Not Authorized' }, status: :forbidden unless has_admin_permissions?
  end

  def authorize_destroy
    render json: { error: 'Not Authorized' }, status: :forbidden unless has_admin_permissions?
  end
  
end
