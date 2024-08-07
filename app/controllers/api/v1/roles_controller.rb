class Api::V1::RolesController < ApplicationController
  before_action :set_role, only: [:show, :update, :destroy]

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
end
