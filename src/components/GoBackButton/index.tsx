import React from 'react';
import { Button, Layout } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { history } from '@@/core/history';

const { Header } = Layout;

const GoBackButton: React.FC = () => {
  const handleGoBack = () => {
    // 使用goBack()返回上一页，如果无法返回则回退到首页
    history.back();
  };

  return (
    <Header style={{ padding: '0 0px', display: 'flex', alignItems: 'center', backgroundColor: 'transparent',
                     fontSize: '14px', color: 'gray',}}>
      <Button
        type="primary"
        onClick={handleGoBack}
        style={{ marginRight: 16 }}
        icon={<LeftOutlined />}
        shape="default"
      >{"返回API列表"}</Button>
    </Header>
  );
};

export default GoBackButton;
