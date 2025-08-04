import {ApiOutlined, CloudDownloadOutlined, LogoutOutlined,} from '@ant-design/icons';
// @ts-ignore
import {history, useModel} from '@umijs/max';
import {Alert, App, Button, Form, Input, MenuProps, Modal, Space, Spin} from 'antd';
import {createStyles} from 'antd-style';
import React, {useState} from 'react';
import {flushSync} from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import {logout} from '@/services/dd-ms-auth/authController';
import {sdkAcquire} from "@/services/dd-openapi-main/sdkController";
import {geneApiKey} from "@/services/dd-ms-auth/userInfoController";

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return (
    <span className="anticon">
    {currentUser?.account} {currentUser?.rolesList?.includes("admin") ? "(管理员)" : "(普通用户)"}
  </span>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

// @ts-ignore
const ApiKeyModal = ({apiKeyModalVisible, setApiKeyModalVisible}) => {
  const [accessKey, setAccessKey] = useState<string>('待获取');
  const [secretKey, setSecretKey] = useState<string>('待获取');
  const { message } = App.useApp();

  const handleGenerateApiKey = async () => {
    try {
      const response = await geneApiKey();
      if (response.code === 200) {
        setAccessKey(response.data?.accessKey || '待获取');
        setSecretKey(response.data?.secretKey || '待获取');
        message.success('API Key 生成成功');
      } else {
        message.error(response.message || 'API Key 生成失败');
      }
    } catch (error) {
      message.error('API Key 生成失败');
    }
  };

  return (
    <Modal
      title="API Key 获取"
      open={apiKeyModalVisible}
      onCancel={() => {
        setAccessKey('待获取');
        setSecretKey('待获取');
        setApiKeyModalVisible(false);
      }}
      footer={[
        <Button
          key="close"
          onClick={() => {
            setAccessKey('待获取');
            setSecretKey('待获取');
            setApiKeyModalVisible(false);
          }}
        >
          关闭
        </Button>,
        <Button
          key="generate"
          type="primary"
          onClick={handleGenerateApiKey}
          style={{ minWidth: 120 }}
        >
          生成 API Key
        </Button>,
      ]}
      width={600}
    >
      <div style={{ padding: '16px 0' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 8,
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.65)'
          }}>
            <span style={{ width: 100 }}>Access Key:</span>
            <Input
              value={accessKey}
              style={{ flex: 1 }}
            />
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.65)'
          }}>
            <span style={{ width: 100 }}>Secret Key:</span>
            <Input
              value={secretKey}
              style={{ flex: 1 }}
            />
          </div>
        </div>
        <Alert
          message="安全提示"
          description="请妥善保管您的APIKey和SecretKey，及时保存。"
          type="warning"
          showIcon
        />
      </div>
    </Modal>
  );
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({menu, children}) => {
  menu = true;

  const {initialState, setInitialState} = useModel('@@initialState');
  const {styles} = useStyles();
  const { message } = App.useApp();
  const [apiKeyModalVisible, setApiKeyModalVisible] = useState(false);

  /** 真正的退出登录逻辑 */
  const logoutS = async () => {
    try {
      // 2️⃣ 先调用后端退出接口
      await logout();
      message.success('已退出登录');
    } catch (error) {
      // 即使接口失败也允许前端退出，防止卡死
      message.error('退出失败，已强制跳转登录页');
    } finally {
      // 3️⃣ 清理本地状态
      flushSync(() => {
        // 清掉全局用户信息
        setInitialState((s: any) => ({...s, currentUser: undefined}));
        localStorage.removeItem('token');
      });
      // 4️⃣ 跳转到登录页
      window.location.href = '/user/login';
    }
  };

  const onMenuClick: MenuProps['onClick'] = ({key}) => {
    if (key === 'logout') {
      logoutS();
      return;
    } else if (key === 'sdkAcquire') {
      sdkAcquire();
      return;
    } else if (key === 'apiKeyAcquire') {
      // 获取apiKey的行为
      setApiKeyModalVisible(true);
      return;
    }
    history.push('/');
  };

  const loading = (
    <span className={styles.action}>
      <Spin size="small" style={{marginLeft: 8, marginRight: 8}}/>
    </span>
  );

  if (!initialState?.currentUser?.account) return loading;

  const menuItems: MenuProps['items'] = [
    {
      key: 'apiKeyAcquire',
      icon: <ApiOutlined />,
      label: 'API密钥获取',
    },
    {
      key: 'sdkAcquire',
      icon: <CloudDownloadOutlined/>,
      label: 'SDK工具包下载',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        {children}
      </HeaderDropdown>
      <ApiKeyModal apiKeyModalVisible={apiKeyModalVisible} setApiKeyModalVisible={setApiKeyModalVisible}/>
    </>
  );
};
