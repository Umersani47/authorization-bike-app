class Api::V1::BikesController < ApplicationController
  skip_before_action :check_permissions, only: :guest_index
  skip_before_action :authenticate_user!, only: :guest_index
  before_action :set_bike, only: [:show, :update, :destroy, :purchase]

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
end
