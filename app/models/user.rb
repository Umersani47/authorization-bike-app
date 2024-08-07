class User < ApplicationRecord
            # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null
  include DeviseTokenAuth::Concerns::User

  belongs_to :role, optional: true
  scope :non_admin_or_no_role, -> { 
    left_joins(:role).where.not(roles: { name: 'admin' }).or(User.where(role_id: nil))
  }
  validates :email, presence: true, uniqueness: true
end
