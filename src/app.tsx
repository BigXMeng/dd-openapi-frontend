import {SettingDrawer, Settings as LayoutSettings} from '@ant-design/pro-components';
import '@ant-design/v5-patch-for-react-19';
import {history, Link, RequestConfig, RequestOptions,} from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import {userInfo} from "@/services/dd-ms-auth/authController";
import {RunTimeLayoutConfig} from "@@/plugin-layout/types";
import {AvatarDropdown, AvatarName, Footer} from "@/components";
import {LinkOutlined} from "@ant-design/icons";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

// 后端服务类型定义
type ServiceType = 'auth' | 'interface';

/**
 * @return 返回一个 Promise，解析值为指定类型的对象
 */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>; // 默认配置组件 config/defaultSettings.ts
  currentUser?: API.UserInfoVO;
  fetchUserInfo?: () => Promise<API.UserInfoVO | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const rst = await userInfo();
      return rst.data;
    } catch (_error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (![loginPath, '/user/register', '/user/register-result'].includes(location.pathname)) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    avatarProps: {
      src: initialState?.currentUser?.userAvatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.account,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

// @ts-ignore
export const request: RequestConfig = {
  // 注意：开发环境不要设置 baseURL，使用代理前缀
  baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_GATEWAY : undefined,

  // 1 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      console.log("当前请求的url为：", config.url);
      // 动态设置服务URL
      const url = config.url;
      const service = detectServiceFromUrl(url);
      console.log("当前请求的service为：", service);
      if (service) {
        config.url = getServiceBaseURL(service) + config.url;
        console.log("修改后的url为：", config.url);
      }
      // 添加认证令牌
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
  ],

  // 2 响应拦截器（新增）
  responseInterceptors: [
    // 第一个拦截器：统一解析后端返回格式
    (response) => {
      return response; // 直接透传，不修改返回值
    },
  ],

  // 3 统一错误处理（可选）
  errorConfig: {
    errorThrower: (res) => {
      // 如果后端返回的 code !== 0 就抛出错误
      const { code, message: msg } = res as { code: number; message: string; data: any };
      if (code >= 300) {
        throw new Error(msg || 'Request Error');
      }
    },
    errorHandler: (error: any, opts: any) => {
      // 这里是全局错误提示
      if (opts?.skipErrorHandler) return;
      const { message: msg } = error;
      // 使用 antd App 的 message（如果已包 App）
      // import { message } from 'antd';
      // message.error(msg);
      console.error(msg);
    },
  },
};

// 获取服务基础URL
const getServiceBaseURL = (service: ServiceType) => {
  if (process.env.NODE_ENV === 'development') {
    // 开发环境使用代理前缀
    return `/${service}-api`;
  }
  // 生产环境使用环境变量配置
  return process.env[`REACT_APP_${service.toUpperCase()}_API`] || '';
};

// 辅助函数：根据URL识别服务类型
function detectServiceFromUrl(url?: string): ServiceType | null {
  if (!url) return null;
  if (url.startsWith('/auth')) return 'auth';
  if (url.startsWith('/interface')) return 'interface';
  return null;
}
