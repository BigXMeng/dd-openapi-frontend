// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 POST /user-roles/add/batch */
export async function batchAdd(
  body: API.UserRolesBatchAddReq,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseVoid>("/user-roles/add/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
