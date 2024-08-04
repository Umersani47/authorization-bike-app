class Bike < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :price, presence: true, numericality: { greater_than: 0 }

  has_one_attached :image
end
