// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 POST /role-permissions/add/batch */
export async function batchAdd1(
  body: API.RolePersBatchAddReq,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseVoid>("/role-permissions/add/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
