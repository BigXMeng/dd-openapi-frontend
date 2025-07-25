import {ApiOutlined, LogoutOutlined, SettingOutlined, UserOutlined,} from '@ant-design/icons';
import {history, useModel} from '@umijs/max';
import type {MenuProps} from 'antd';
import {message, Spin} from 'antd';
import {createStyles} from 'antd-style';
import React from 'react';
import {flushSync} from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import {logout} from '@/services/dd-ms-auth/authController'; // 1️⃣ 用别名防止重名

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.account}</span>;
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

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({menu, children,}) => {
  menu = true;

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
        setInitialState((s) => ({...s, currentUser: undefined}));
        localStorage.removeItem("token")
      });
      // 4️⃣ 记录当前地址用于登录后回跳
      const {pathname, search} = window.location;
      history.replace({
        pathname: '/user/login',
        search: new URLSearchParams({redirect: pathname + search}).toString(),
      });
    }
  };

  const { styles } = useStyles();
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick: MenuProps['onClick'] = ({key}) => {
    if (key === 'logout') {
      logoutS(); // 5️⃣ 调用修复后的方法
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
    // ...(menu
    //   ? [
    //       {
    //         key: 'center',
    //         icon: <UserOutlined />,
    //         label: '个人中心',
    //       },
    //       {
    //         key: 'settings',
    //         icon: <SettingOutlined />,
    //         label: '个人设置',
    //       },
    //       {
    //         type: 'divider' as const,
    //       },
    //     ]
    //   : []),
    {
      key: 'settings',
      icon: <ApiOutlined />,
      label: 'API密钥获取',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
