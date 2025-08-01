import {SettingDrawer, Settings as LayoutSettings} from '@ant-design/pro-components';
import '@ant-design/v5-patch-for-react-19';
import {history, RequestConfig, RequestOptions,} from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import {getUserInfoByToken} from "@/services/dd-ms-auth/userInfoController";
import {RunTimeLayoutConfig} from "@@/plugin-layout/types";
import {AvatarDropdown, AvatarName, Footer} from "@/components";
import {LinkOutlined} from "@ant-design/icons";

const loginPath = '/user/login';
const isDev = process.env.NODE_ENV === 'development';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserVO;
  fetchUserInfo?: () => Promise<API.UserVO | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const rst = await getUserInfoByToken();
      return rst.data;
    } catch (_error) {
      history.push(loginPath);
    }
    return undefined;
  };
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
    links:
      [
        <a key="openapi" href="https://blog.bigbigmeng.online/" target="_blank" rel="noopener noreferrer">
          <LinkOutlined/>
          <span>API调用说明文档</span>
        </a>
      ],
    // links: isDev
    //   ? [
    //     <Link key="openapi" to="https://blog.bigbigmeng.online/" target="_blank">
    //       <LinkOutlined />
    //       <span>OpenAPI调用文档说明</span>
    //     </Link>,
    //   ]
    //   : [],
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
  // 开发环境不要设置 baseURL，使用代理前缀
  baseURL: process.env.NODE_ENV === 'production' ? '' : '',

  // 1 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      console.log("当前请求的url为：", config.url);
      // 动态设置服务URL
      const url = config.url;

      // 统一处理：所有环境都添加服务前缀
      const service = detectServiceFromUrl(config.url);
      if (service) {
        // 关键修改：始终添加服务前缀
        config.url = `/${service}-api${config.url}`;
        console.log("修改后的url为：", config.url);
      }

      if(url == '/auth/login') {
        return config;
      }

      // 添加认证令牌
      const token = localStorage.getItem('token');
      if (token) {
        console.log("请求拦截，添加请求头Authorization：", `Bearer ${token}`)
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      // 添加调用的接口的id标识
      let currInterfaceId = null;
      if (url?.startsWith('/ui-client/')) {
        currInterfaceId = localStorage.getItem("current_interface_id");
        console.log("请求拦截，当前请求方法为UI调试方法，请求头需携带接口标识id：", currInterfaceId)
        config.headers = {
          ...config.headers,
          'X-Interface-Id': `${currInterfaceId}`,
        };
      }

      if(url == '/user/info' || url == '/auth/logout') {
        return config;
      }

      try {
        // 从localStorage中读取用户信息
        const accessKey = localStorage.getItem('accessKey');
        console.log("请求拦截，添加请求头accessKey：", accessKey);
        if (accessKey) {
          config.headers = {
            ...config.headers,
            'X-Access-Key': accessKey,
          };
        }
      } catch (error) {
        console.error('Error adding apiKey headers:', error);
      }
      return config;
    },
  ],

  // 2 响应拦截器
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

// 后端服务类型定义
type ServiceType = 'auth' | 'openapi-main';

// 辅助函数：根据URL识别服务类型
function detectServiceFromUrl(url?: string): ServiceType | null {
  if (!url) return null;

  // 移除路径前缀检测，直接根据功能分组
  if (
    url.includes('/login') ||
    url.includes('/user/') ||
    url === '/auth/logout'
  ) return 'auth';

  if (
    url.includes('/interface/') ||
    url.includes('/statistic/') ||
    url.includes('/ui-client/') ||
    url.includes('/user-interface/') ||
    url.includes('/sdk/')
  ) return 'openapi-main';

  return null;
}
