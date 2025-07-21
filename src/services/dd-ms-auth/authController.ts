// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 POST /auth/gene-secret-key */
export async function geneSecretKey(options?: { [key: string]: any }) {
  return request<API.ApiResponseString>("/auth/gene-secret-key", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /auth/login */
export async function login(
  body: API.LoginReq,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseAuthResponse>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /auth/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.ApiResponseVoid>("/auth/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /auth/register */
export async function register(
  body: API.RegisterReq,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseAuthResponse>("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /auth/token-refresh */
export async function refreshToken(options?: { [key: string]: any }) {
  return request<API.ApiResponseRefreshTokenResponse>("/auth/token-refresh", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /auth/user-info */
export async function userInfo(options?: { [key: string]: any }) {
  return request<API.ApiResponseUserInfoVO>("/auth/user-info", {
    method: "POST",
    ...(options || {}),
  });
}
