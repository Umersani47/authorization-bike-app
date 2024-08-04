class User < ApplicationRecord
            # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null
            include DeviseTokenAuth::Concerns::User


  belongs_to :role, optional: true
  scope :non_admin_or_no_role, -> { 
    left_joins(:role)
    .where('roles.name IS NULL OR roles.name != ?', 'admin')
  }
  validates :email, presence: true, uniqueness: true

  def has_permission?(permission_name)
    role.has_permission?(permission_name)
  end

  def is_admin?
    role.name == 'admin'
  end
end
