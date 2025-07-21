// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 POST /interface/add */
export async function add(
  body: API.InterfaceInfoAddReq,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseVoid>("/interface/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /interface/add/batch/mp */
export async function addBatchMp(
  body: API.InterfaceInfoDO[],
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseVoid>("/interface/add/batch/mp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /interface/delete */
export async function deleteUsingDelete(
  body: API.InterfaceInfoDeleteReq,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseVoid>("/interface/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /interface/page */
export async function page(
  body: API.InterfaceInfoQueryReq,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseIPageInterfaceInfoVO>("/interface/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /interface/test-data-gene */
export async function generateInterfaceData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.generateInterfaceDataParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseInteger>("/interface/test-data-gene", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /interface/update */
export async function update(
  body: API.InterfaceInfoUpdateReq,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseVoid>("/interface/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
