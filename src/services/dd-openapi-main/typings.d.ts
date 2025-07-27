declare namespace API {
  type ApiResponseCallUUIDGeneResp = {
    code?: number;
    message?: string;
    responseHeader?: string;
    responseTime?: string;
    data?: CallUUIDGeneResp;
  };

  type ApiResponseInteger = {
    code?: number;
    message?: string;
    responseHeader?: string;
    responseTime?: string;
    data?: number;
  };

  type ApiResponseInterfaceInfoVO = {
    code?: number;
    message?: string;
    responseHeader?: string;
    responseTime?: string;
    data?: InterfaceInfoVO;
  };

  type ApiResponseIPageInterfaceInfoVO = {
    code?: number;
    message?: string;
    responseHeader?: string;
    responseTime?: string;
    data?: IPageInterfaceInfoVO;
  };

  type ApiResponseIpInfoResp = {
    code?: number;
    message?: string;
    responseHeader?: string;
    responseTime?: string;
    data?: IpInfoResp;
  };

  type ApiResponseQrCodeResp = {
    code?: number;
    message?: string;
    responseHeader?: string;
    responseTime?: string;
    data?: QrCodeResp;
  };

  type ApiResponseString = {
    code?: number;
    message?: string;
    responseHeader?: string;
    responseTime?: string;
    data?: string;
  };

  type ApiResponseVoid = {
    code?: number;
    message?: string;
    responseHeader?: string;
    responseTime?: string;
    data?: Record<string, any>;
  };

  type CallUUIDGeneReq = {
    /** 生成的UUID字符串的数量 */
    num?: number;
  };

  type CallUUIDGeneResp = {
    uuidList?: string[];
  };

  type generateInterfaceDataParams = {
    count: number;
    userIdRange?: string;
  };

  type getParams = {
    id: number;
  };

  type InterfaceInfoAddReq = {
    /** 名称 */
    name: string;
    /** 描述 */
    description?: string;
    /** 接口地址 */
    url: string;
    /** 请求参数 */
    requestParams: string;
    /** 请求头 */
    requestHeader?: string;
    /** 响应头 */
    responseHeader?: string;
    /** 接口状态（0-关闭，1-开启） */
    status: number;
    /** 请求类型 */
    method: string;
    /** 创建人账户名 */
    userAccount: string;
  };

  type InterfaceInfoDeleteReq = {
    /** 接口id列表 */
    ids: number[];
  };

  type InterfaceInfoQueryParams = {
    /** ID列表 */
    ids: number[];
    /** 接口名称 */
    name?: string;
    /** 接口描述 */
    description?: string;
    /** 接口地址 */
    url?: string;
    /** 请求类型 */
    method?: string;
    /** 创建人账户名 */
    userAccount?: string;
    /** 接口状态（0-关闭，1-开启） */
    status?: number;
    /** 是否删除(0-未删, 1-已删) */
    isDelete?: number;
    /** 创建时间范围 */
    createTimeRange?: string[];
    /** 更新时间范围 */
    updateTimeRange?: string[];
  };

  type InterfaceInfoQueryReq = {
    pageParams?: PageParams;
    queryParams?: InterfaceInfoQueryParams;
  };

  type InterfaceInfoUpdateReq = {
    /** 主键ID */
    id: number;
    /** 名称 */
    name?: string;
    /** 描述 */
    description?: string;
    /** 接口地址 */
    url?: string;
    /** 请求参数 */
    requestParams?: string;
    /** 请求头 */
    requestHeader?: string;
    /** 响应头 */
    responseHeader?: string;
    /** 接口状态（0-关闭，1-开启） */
    status?: number;
    /** 请求类型 */
    method?: string;
    /** 是否删除(0-未删, 1-已删) */
    isDelete?: number;
  };

  type InterfaceInfoVO = {
    /** 主键ID */
    id?: number;
    /** 名称 */
    name?: string;
    /** 描述 */
    description?: string;
    /** 接口地址 */
    url?: string;
    /** 请求参数 */
    requestParams?: string;
    /** 请求头 */
    requestHeader?: string;
    /** 响应头 */
    responseHeader?: string;
    /** 接口状态（0-关闭，1-开启） */
    status?: number;
    /** 请求类型 */
    method?: string;
    /** 创建人ID */
    userAccount?: string;
    /** 创建人名称 */
    userName?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 是否删除(0-未删, 1-已删) */
    isDelete?: number;
  };

  type IPageInterfaceInfoVO = {
    size?: number;
    total?: number;
    records?: InterfaceInfoVO[];
    current?: number;
    pages?: number;
  };

  type IpInfoResp = {
    ip?: string;
    pro?: string;
    proCode?: string;
    city?: string;
    cityCode?: string;
    region?: string;
    regionCode?: string;
    addr?: string;
    regionNames?: string;
    err?: string;
  };

  type PageParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type qrCodeParams = {
    content: string;
  };

  type QrCodeResp = {
    base64Image?: string;
  };

  // 自定义请求头（只包含accessKey和secretKey）
  type ApiKeyHeaders = {
    accessKey?: String,
  };
}
