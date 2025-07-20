/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState: { currentUser?: API.AuthResponse } | undefined,
) {
  const { currentUser } = initialState ?? {};

  // 判断用户是否具有admin权限
  const hasAdminRole = currentUser?.rolesList?.includes('admin') || false;

  return {
    canAdmin: hasAdminRole,
    // 可以继续添加其他权限判断
    // canEdit: hasAdminRole || currentUser?.rolesList?.includes('editor'),
    // canView: true, // 所有用户都有查看权限
  };
}
