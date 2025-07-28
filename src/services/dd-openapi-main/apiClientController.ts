// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 GET /ui-client/call-api/gene-str-api */
export async function callGeneStrApi(options?: { [key: string]: any }) {
  return request<API.ApiResponseCallOpenApi>("/ui-client/call-api/gene-str-api", {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // 默认请求头
      ...options?.headers, // 如果options中有headers字段，将其合并到默认请求头中
    },
    ...(options || {}), // 其他选项
  });
}

/** 此处后端没有提供注释 GET /ui-client/call-api/ip-info */
export async function ipInfo(options?: { [key: string]: any }) {
  return request<API.ApiResponseCallOpenApi>("/ui-client/call-api/ip-info", {
    method: "GET",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /ui-client/call-api/qr-code/${param0} */
export async function qrCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.qrCodeParams,
  options?: { [key: string]: any }
) {
  const { content: param0, ...queryParams } = params;
  return request<API.ApiResponseCallOpenApi>(
    `/ui-client/call-api/qr-code/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /ui-client/call-api/uuid-batch */
export async function uuidBatch(
  body: API.CallUUIDGeneReq,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseCallOpenApi>(
    "/ui-client/call-api/uuid-batch",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}
