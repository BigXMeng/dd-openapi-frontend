import {Footer} from '@/components';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {App, Button, Tabs} from 'antd';
import {createStyles} from 'antd-style';
import React, {useState} from 'react';
import {flushSync} from 'react-dom';
import {useModel} from 'umi';
import {login, register} from "@/services/dd-ms-auth/authController";
import Settings from '../../../../config/defaultSettings';
import {Helmet} from "@@/exports";

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Login: React.FC = () => {
  const [
    currentUserInfo,        // 当前用户信息（状态管理）
    updateCurrentUserInfo   // 更新用户信息的函数
  ] = useState<API.UserVO>({} as API.UserVO);
  const [
    operationType,
    updateOperationType
  ] = useState<string>('login');
  const {
    initialState,           // 当前应用的全局初始状态对象
    setInitialState         // 更新全局状态的函数
  } = useModel('@@initialState');
  const { styles } = useStyles();
  const { message } = App.useApp();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginReq) => {
    try {
      // 登录
      const rst = await login({
        ...values,
      });
      console.log("登录响应结果：", rst);
      if (rst.code === 200 || rst.code === 201) {
        console.log("提示登录成功：", '登录成功！持续2秒');
        message.success('登录成功！', 500);
        if (rst.data?.accessToken) {
          localStorage.setItem('token', rst.data.accessToken);
        } else {
          message.error('登录失败：服务端未返回token');
          return;
        }
        // 延迟 1 秒跳转
        setTimeout(async () => {
          // 获取用户信息
          await fetchUserInfo();
          const urlParams = new URL(window.location.href).searchParams;
          window.location.href = urlParams.get('redirect') || '/';
        }, 500);
        return;
      }
      // 如果失败去设置用户错误信息
      // @ts-ignore
      updateCurrentUserInfo(undefined);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  const handleRegister = async (values: API.RegisterReq) => {
    try {
      // 注册
      const rst = await register({
        ...values,
      });
      console.log("注册响应结果：", rst);
      if (rst.code === 200 || rst.code === 201) {
        console.log("提示注册成功：", '注册成功！持续2秒');
        message.success('注册成功！');
        updateOperationType("login"); // 注册成功后切换回登录模式
        return;
      }
      message.error('注册失败，请重试！');
    } catch (error) {
      const defaultRegisterFailureMessage = '注册失败，请重试！';
      console.log(error);
      message.error(defaultRegisterFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      {/*页面头部信息*/}
      <Helmet>
        <title>
          {'登录 | 注册'}
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      > {/*submitter-自定义组件*/}
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="API开放平台"
          subTitle={'API开放平台 为开发人员提供三方api接口'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            if (operationType === 'register') {
              await handleRegister(values as API.RegisterReq);
            } else {
              await handleSubmit(values as API.LoginReq);
            }
          }}
          submitter={{
            render: (_, dom) => {
              return (
                <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
                  {operationType === 'register' ? '注册' : '登录'}
                </Button>
              );
            }
          }}
        >
          <Tabs
            activeKey={operationType}
            onChange={updateOperationType} // updateOperationType函数更新的值就是下面列表的key：login|register
            centered
            items={[
              {
                key: 'login',
                label: '账户密码登录',
              },
              {
                key: 'register',
                label: '用户注册',
              },
            ]}
          />

          {operationType === 'login' && (
            <>
              <ProFormText
                name="account"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />
                }}
                placeholder={'用户名: liuxianmeng | user'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>
                }}
                placeholder={'密码: 123!@#qwe'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {operationType === 'register' && (
            <>
              <ProFormText
                name="account"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'用户名: 不小于4位，如：Lucy'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'密码: 不小于8位，如：123!@#qwe'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
