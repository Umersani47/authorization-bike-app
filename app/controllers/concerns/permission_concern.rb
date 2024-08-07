module PermissionConcern
  extend ActiveSupport::Concern

  included do
    before_action :check_permissions
  end

  private

  def check_permissions
    permission_service = PermissionService.new(current_user, controller_name, action_name)
    unless permission_service.can_access?
      render json: { error: 'Access denied' }, status: :forbidden
    end
  end
end
