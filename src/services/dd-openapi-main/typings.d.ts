declare namespace API {
  type ApiResponseInteger = {
    code?: number;
    message?: string;
    data?: number;
  };

  type ApiResponseIPageInterfaceInfoVO = {
    code?: number;
    message?: string;
    data?: IPageInterfaceInfoVO;
  };

  type ApiResponseVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type generateInterfaceDataParams = {
    count: number;
    userIdRange?: string;
  };

  type InterfaceInfoAddReq = {
    name: string;
    description?: string;
    url: string;
    requestParams: string;
    requestHeader?: string;
    responseHeader?: string;
    status: number;
    method: string;
    userId: number;
  };

  type InterfaceInfoDeleteReq = {
    ids: number[];
  };

  type InterfaceInfoDO = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type InterfaceInfoQueryParams = {
    ids: number[];
    name?: string;
    description?: string;
    url?: string;
    method?: string;
    userId?: number;
    status?: number;
    isDelete?: number;
    createTimeRange?: string[];
    updateTimeRange?: string[];
  };

  type InterfaceInfoQueryReq = {
    pageParams?: PageParams;
    queryParams?: InterfaceInfoQueryParams;
  };

  type InterfaceInfoUpdateReq = {
    id: number;
    name?: string;
    description?: string;
    url?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: string;
    isDelete?: number;
  };

  type InterfaceInfoVO = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: string;
    userAccount?: string;
    userName?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type IPageInterfaceInfoVO = {
    size?: number;
    total?: number;
    records?: InterfaceInfoVO[];
    current?: number;
    pages?: number;
  };

  type PageParams = {
    pageNum?: number;
    pageSize?: number;
  };
}
