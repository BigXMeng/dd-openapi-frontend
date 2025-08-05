import {PageContainer} from '@ant-design/pro-components';
import '@umijs/max';
import {Avatar, Card, Typography} from 'antd';
import React from 'react';
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";

const {Meta} = Card;
const {Text} = Typography;

const SysMonitor: React.FC = () => {
  return (
    <PageContainer>
      <Card
        style={{width: 300}}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting"/>,
          <EditOutlined key="edit"/>,
          <EllipsisOutlined key="ellipsis"/>,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"/>}
          title="Card title"
          description="This is the description"
        />
      </Card>

    </PageContainer>
  );
};
export default SysMonitor;
