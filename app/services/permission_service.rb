# app/services/permission_service.rb
class PermissionService
  def initialize(user, controller_name, action_name)
    @user = user
    @controller_name = controller_name
    @action_name = action_name
  end

  def can_access?
    return false unless @user.role
    return true if @user.role.name == 'admin'

    role_permissions = @user.role&.permissions || {}
    action_permission = "can_access_#{@controller_name}_#{@action_name}"
    
    role_permissions[action_permission].present? && role_permissions[action_permission]
  end
end
