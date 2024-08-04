class Api::V1::BikesController < ApplicationController
  before_action :authenticate_user!, except: [:guest_index]
  before_action :set_bike, only: [:show, :update, :destroy, :purchase]
  before_action :authorize_create, only: [:create]
  before_action :authorize_update, only: [:update]
  before_action :authorize_destroy, only: [:destroy]
  before_action :authorize_purchase, only: [:purchase]

  def index
    @bikes = Bike.all.sort
    render json: @bikes
  end

  def guest_index
    @bikes = Bike.select(:title, :image_url).sort
    render json: @bikes
  end

  def show
    render json: @bike
  end

  def create
    @bike = Bike.new(bike_params)
    if @bike.save
      render json: @bike, status: :created
    else
      render json: @bike.errors, status: :unprocessable_entity
    end
  end

  def update
    if @bike.update(bike_params)
      render json: @bike
    else
      render json: @bike.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @bike.destroy
    head :no_content
  end

  def purchase
    if @bike.quantity > 0
      @bike.update(quantity: @bike.quantity - 1)
    end

    render json: Bike.all.sort
  end

  private

  def set_bike
    @bike = Bike.find(params[:id])
  end

  def bike_params
    params.require(:bike).permit(:title, :description, :price, :image_url, :model, :engine_no, :engine_size)
  end

  def authorize_create
    render json: { error: 'Not Authorized' }, status: :forbidden unless has_permission?('create_bike')
  end

  def authorize_update
    render json: { error: 'Not Authorized' }, status: :forbidden unless has_permission?('update_bike')
  end

  def authorize_destroy
    render json: { error: 'Not Authorized' }, status: :forbidden unless has_permission?('delete_bike')
  end

  def authorize_purchase
    render json: { error: 'Not Authorized' }, status: :forbidden unless has_permission?('can_purchase')
  end

end
