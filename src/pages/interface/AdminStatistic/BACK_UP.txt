import {PageContainer, ProTable, StatisticCard} from '@ant-design/pro-components';
import '@umijs/max';
import {Card, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {interfaceInvokeTop3InfoVO} from "@/services/dd-openapi-main/apiInfoController";

const {Text} = Typography;

const InterfaceStatistic: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInvokeTop3InfoVO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: API.ApiResponseCallOpenApi = await interfaceInvokeTop3InfoVO();
        if (result.code === 200) {
          // @ts-ignore
          setData(result.data?.slice(0, 3)); // 只取Top3数据
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    // <PageContainer content={' 这个页面只有 admin 权限才能查看'}>
    <PageContainer>

      <Card title="API调用Top3统计" bordered={false}>
        <ProTable
          columns={[
            {
              title: 'API名称',
              dataIndex: 'interfaceName',
              key: 'interfaceName',
              render: (text) => <Text strong>{text}</Text>,
            },
            {
              title: '调用次数',
              dataIndex: 'invokedTotalNum',
              key: 'invokedTotalNum',
              render: (text) => <Text strong>{text}</Text>,
            },
          ]}
          dataSource={data}
          loading={loading}
          rowKey="id"
          pagination={false}
        />
      </Card>
      <div style={{marginTop: 24}}>
        <StatisticCard
          title="总调用次数"
          // @ts-ignore
          value={data.reduce((acc, item) => acc + item.invokedTotalNum, 0)}
          chart={<></>}
        />
      </div>

      {/*<Card>*/}
      {/*  <Alert*/}
      {/*    message={'更快更强的重型组件，已经发布。'}*/}
      {/*    type="success"*/}
      {/*    showIcon*/}
      {/*    banner*/}
      {/*    style={{*/}
      {/*      margin: -12,*/}
      {/*      marginBottom: 48,*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <Typography.Title*/}
      {/*    level={2}*/}
      {/*    style={{*/}
      {/*      textAlign: 'center',*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor="#eb2f96" /> You*/}
      {/*  </Typography.Title>*/}
      {/*</Card>*/}
      {/*<p*/}
      {/*  style={{*/}
      {/*    textAlign: 'center',*/}
      {/*    marginTop: 24,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Want to add more pages? Please refer to{' '}*/}
      {/*  <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">*/}
      {/*    use block*/}
      {/*  </a>*/}
      {/*  。*/}
      {/*</p>*/}
    </PageContainer>
  );
};
export default InterfaceStatistic;
