// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 POST /public/gene-secret-key */
export async function geneSecretKey(options?: { [key: string]: any }) {
  return request<API.ApiResponseString>("/public/gene-secret-key", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /public/login */
export async function login(
  body: API.LoginReq,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseAuthResponse>("/public/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /public/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.ApiResponseVoid>("/public/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /public/refresh-token */
export async function refreshToken(options?: { [key: string]: any }) {
  return request<API.ApiResponseAuthResponse>("/public/refresh-token", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /public/register */
export async function register(
  body: API.RegisterReq,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseAuthResponse>("/public/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
