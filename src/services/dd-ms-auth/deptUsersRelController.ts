// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 POST /dept-users/add */
export async function add(
  body: API.DeptUsesRelAddReq,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseVoid>("/dept-users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
