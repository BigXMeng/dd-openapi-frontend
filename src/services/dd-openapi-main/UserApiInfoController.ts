// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 开通API调用次数 POST /interface/add */
export async function enableInvoke(
  body: API.EnableInvokeInterfaceReq,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseVoid>("/user-interface/enable-invoke", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
