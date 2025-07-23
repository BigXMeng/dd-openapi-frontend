// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 POST /user/info */
export async function getUserInfoByToken(options?: { [key: string]: any }) {
  return request<API.ApiResponseUserVO>("/user/info", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/info/secretKey */
export async function secretKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.secretKeyParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseString>("/user/info/secretKey", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
