// @ts-ignore
/* eslint-disable */
import {message} from "antd";

/**
 * 获取SDK文件
 */
export async function sdkAcquire() {
  try {
    // 显示"正在下载中"的提示
    const loadingMessage = message.loading('SDK正在下载中...', 0);

    // 直接使用提供的URL（注意移除了末尾空格）
    const fileUrl = 'https://bigbigmeng-cd-f-1317734527.cos.ap-chengdu.myqcloud.com/dd-openapi/202508/dd-openapi-sdk.zip';

    // 创建一个隐藏的<a>标签用于下载
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'dd-openapi-sdk.zip'; // 直接设置想要的文件名

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
