// @ts-ignore
/* eslint-disable */
import {message} from "antd";

/** 此处后端没有提供注释 GET /sdk/download */
// export async function downloadSdk(options?: { [key: string]: any }) {
//   return request<string>("/sdk/download", {
//     method: "GET",
//     ...(options || {}),
//   });
// }

export async function downloadSdk(options?: { [key: string]: any }) {
  try {
    // 发起请求，获取文件流
    const response = await fetch("/sdk/download", {
      method: "GET",
      ...options,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // 获取文件名
    const contentDisposition = response.headers.get('content-disposition');
    const fileName = contentDisposition
    ?.split('filename=')[1]
    ?.replace(/"/g, ''); // 去掉引号

    // 创建一个隐藏的 <a> 标签并触发下载
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'dd-openapi-sdk-1.0-SNAPSHOT.jar'; // 默认文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url); // 释放对象 URL

    return fileName; // 返回文件名
  } catch (error) {
    throw error;
  }
}

/**
 * 获取SDK文件
 */
export async function sdkAcquire() {
  try {
    // 显示"正在下载中"的提示
    const loadingMessage = message.loading('SDK正在下载中...', 0);

    // 直接使用提供的URL（注意移除了末尾空格）
    const fileUrl = 'https://bigbigmeng-cd-f-1317734527.cos.ap-chengdu.myqcloud.com/dd-openapi/202508/dd-openapi-sdk.jar';

    // 创建一个隐藏的<a>标签用于下载
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'dd-openapi-sdk.jar'; // 直接设置想要的文件名

    // 触发点击事件
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 下载完成后隐藏加载提示
    loadingMessage();
    message.success('SDK正在下载中...');
  } catch (error) {
    message.error('SDK 下载失败，请稍后再试');
    console.error('SDK 下载失败：', error);
  }
}
