import { PageContainer, ProTable, StatisticCard } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { interfaceInvokeTop3InfoVO } from "@/services/dd-openapi-main/apiInfoController";

const { Text } = Typography;

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

  useEffect(() => {
    if (data.length > 0) {
      const chartDom = document.getElementById('main');
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: 'API调用Top3统计'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item.interfaceName)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '调用次数',
            type: 'bar',
            data: data.map(item => item.invokedTotalNum)
          }
        ]
      };

      myChart.setOption(option);
    }
  }, [data]);

  return (
    <PageContainer>
      {/*<Card title="API调用Top3统计" bordered={false}>*/}
      {/*  <ProTable*/}
      {/*    columns={[*/}
      {/*      {*/}
      {/*        title: 'API标识',*/}
      {/*        dataIndex: 'interfaceInfoId',*/}
      {/*        key: 'interfaceInfoId',*/}
      {/*        // render: (text) => <Text strong>{text}</Text>,*/}
      {/*        render: (text) => <Text>{text}</Text>,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        title: 'API名称',*/}
      {/*        dataIndex: 'interfaceName',*/}
      {/*        key: 'interfaceName',*/}
      {/*        render: (text) => <Text>{text}</Text>,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        title: '调用次数',*/}
      {/*        dataIndex: 'invokedTotalNum',*/}
      {/*        key: 'invokedTotalNum',*/}
      {/*        render: (text) => <Text>{text}</Text>,*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*    dataSource={data}*/}
      {/*    loading={loading}*/}
      {/*    rowKey="id"*/}
      {/*    pagination={false}*/}
      {/*  />*/}
      {/*</Card>*/}

      {/*<div style={{ marginTop: 24 }}>*/}
      {/*  <StatisticCard*/}
      {/*    title="总调用次数"*/}
      {/*    value={data.reduce((acc, item) => acc + item.invokedTotalNum, 0)}*/}
      {/*    chart={<></>}*/}
      {/*  />*/}
      {/*</div>*/}
      <div id="main" style={{ width: '100%', height: '400px' }}></div>
    </PageContainer>
  );
};

export default InterfaceStatistic;
