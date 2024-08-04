class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :authorize_user, only: [:show, :update, :destroy]

  def index
    @users = User.non_admin_or_no_role
    render json: @users.as_json(include: :role)
  end

  def show
    render json: @user
  end

  def update
    if @user.update(users_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    head :no_content
  end

  def user_role
    render json: @current_user.role&.name
  end

  private

  def users_params
    params.require(:user).permit(:role_id)
  end

  def set_user
    @user = User.find(params[:id])
  end

  def authorize_user
    render json: { error: 'Not Authorized' }, status: :forbidden unless has_admin_permissions?
  end

end
