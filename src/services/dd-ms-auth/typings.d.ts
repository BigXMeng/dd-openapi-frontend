declare namespace API {
  type ApiResponseAuthResponse = {
    code?: number;
    message?: string;
    data?: AuthResponse;
  };

  type ApiResponseMapStringMapStringString = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type ApiResponseRefreshTokenResponse = {
    code?: number;
    message?: string;
    data?: RefreshTokenResponse;
  };

  type ApiResponseString = {
    code?: number;
    message?: string;
    data?: string;
  };

  type ApiResponseUserVO = {
    code?: number;
    message?: string;
    data?: UserVO;
  };

  type ApiResponseVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type AuthResponse = {
    accessToken?: string;
    refreshToken?: string;
    account?: string;
    userAvatar?: string;
    expiresIn?: number;
    tokenType?: string;
  };

  type DeptUsesRelAddReq = {
    account?: string;
    deptIdentification?: string;
  };

  type LoginReq = {
    /** 账户名 */
    account: string;
    /** 密码 密码需满足复杂度要求：8-20位，包含大小写字母和数字（当前简化，只需123456即可） */
    password: string;
  };

  type PermissionVO = {
    perName?: string;
    perDesc?: string;
    perScope?: string;
    perOpLevel?: string;
    perParentId?: number;
    appId?: number;
  };

  type RefreshTokenResponse = {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
  };

  type RegisterReq = {
    account: string;
    password?: string;
    userRealName?: string;
  };

  type RolePersBatchAddReq = {
    roleId?: number;
    permissionIds?: number[];
  };

  type RoleVO = {
    roleId?: number;
    roleName?: string;
    roleDesc?: string;
    validityPeriodStart?: string;
    validityPeriodEnd?: string;
    permissions?: PermissionVO[];
  };

  type secretKeyParams = {
    accessKey: string;
  };

  type SecurityConfiguration = {
    apiKey?: string;
    apiKeyVehicle?: string;
    apiKeyName?: string;
    clientId?: string;
    clientSecret?: string;
    realm?: string;
    appName?: string;
    scopeSeparator?: string;
    additionalQueryStringParams?: Record<string, any>;
    useBasicAuthenticationWithAccessCodeGrant?: boolean;
    enableCsrfSupport?: boolean;
  };

  type SwaggerResource = {
    name?: string;
    url?: string;
    swaggerVersion?: string;
    location?: string;
  };

  type UiConfiguration = {
    deepLinking?: boolean;
    displayOperationId?: boolean;
    defaultModelsExpandDepth?: number;
    defaultModelExpandDepth?: number;
    defaultModelRendering?: "example" | "model";
    displayRequestDuration?: boolean;
    docExpansion?: "none" | "list" | "full";
    filter?: Record<string, any>;
    maxDisplayedTags?: number;
    operationsSorter?: "alpha" | "method";
    showExtensions?: boolean;
    showCommonExtensions?: boolean;
    tagsSorter?: "alpha";
    validatorUrl?: string;
    apisSorter?: string;
    jsonEditor?: boolean;
    showRequestHeaders?: boolean;
    supportedSubmitMethods?: string[];
  };

  type UserRolesBatchAddReq = {
    userId?: number;
    roleIds?: number[];
  };

  type UserVO = {
    account?: string;
    userRealName?: string;
    userAvatar?: string;
    contactInfo?: string;
    status?: string;
    rolesList?: string[];
    rolesVOList?: RoleVO[];
  };
}
