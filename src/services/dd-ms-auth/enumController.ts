// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 GET /enum/list */
export async function list(options?: { [key: string]: any }) {
  return request<API.ApiResponseMapStringMapStringString>("/enum/list", {
    method: "GET",
    ...(options || {}),
  });
}
