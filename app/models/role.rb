class Role < ApplicationRecord
  has_many :users

  validates :name, presence: true, uniqueness: true

  scope :not_admin, -> { where.not(name: 'admin' ) }

  enum name: { admin: 'Admin', seller: 'Seller', seller_assistant: 'Seller Assitant', buyer: 'Buyer' }

  def has_permission?(permission_name)
    permissions[permission_name]
  end
end
