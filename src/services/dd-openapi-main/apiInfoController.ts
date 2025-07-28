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

export async function get(id: string | number) {
  return request<API.InterfaceInfoVO>(`/interface/get/${id}`, {
    method: "GET",
  });
}

/** 此处后端没有提供注释 POST /interface/page */
export async function page(
  body: API.InterfaceInfoQueryReq,
  options?: { [key: string]: any }
) {
  return request<API.InterfaceInfoVO>("/interface/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
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
