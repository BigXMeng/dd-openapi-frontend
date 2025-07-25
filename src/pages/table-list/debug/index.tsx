import { SendOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormField,
  ProFormGroup,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import {
  Button,
  Col,
  Collapse,
  Input,
  message,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import JsonView from 'react-json-view';
import './index.less';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const API_DEBUG_URL = '/api/debug'; // 后端调试接口地址

const ApiDebugPage = () => {
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState('params');
  const [apiInfo, setApiInfo] = useState<any>({
    name: '用户查询接口',
    description: '用于查询用户信息的接口',
    url: '/api/user/{id}',
    method: 'GET',
    requestParams: '{"id":"long","name":"string"}',
    requestHeader: '{"Content-Type":"application/json"}',
  });

  // 解析JSON字符串为对象
  const parseJsonString = (str: string) => {
    try {
      return str ? JSON.parse(str) : {};
    } catch (e) {
      return {};
    }
  };

  // 处理调试请求
  const handleDebug = async (values: any) => {
    setLoading(true);
    setResponseData(null);

    try {
      // 构建请求数据
      const requestData = {
        ...apiInfo,
        ...values,
        requestParams: values.requestParams
          ? JSON.stringify(values.requestParams)
          : '{}',
        requestHeader: values.requestHeader
          ? JSON.stringify(values.requestHeader)
          : '{}',
      };

      // 模拟请求延迟
      await new Promise((resolve) => setTimeout(resolve, 800));

      // 模拟响应数据
      const mockResponse = {
        status: 200,
        data: {
          id: 12345,
          name: '张三',
          email: 'zhangsan@example.com',
          roles: ['admin', 'user'],
          createdAt: '2023-01-15T10:30:00Z',
          active: true,
          profile: {
            age: 28,
            location: '北京市朝阳区',
          },
        },
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': '1000',
          'X-RateLimit-Remaining': '997',
        },
        responseTime: 156,
      };

      setResponseData(mockResponse);
      message.success('接口调试成功');
    } catch (error) {
      message.error('接口调试失败');
      console.error('Debug error:', error);
      setResponseData({
        status: 500,
        error: '请求失败，请检查网络连接或API配置',
      });
    } finally {
      setLoading(false);
    }
  };

  // 初始化请求参数
  useEffect(() => {
    const initialValues = {
      requestParams: parseJsonString(apiInfo.requestParams),
      requestHeader: parseJsonString(apiInfo.requestHeader),
    };
  }, []);

  return (
    <PageContainer
      className="api-debug-page"
      header={{
        title: (
          <Title level={2} style={{ margin: 0 }}>
            {apiInfo.name} API在线调试
          </Title>
        ),
        breadcrumb: {},
      }}
    >
      <ProCard
        title="API基本信息"
        bordered
        headerBordered
        className="api-info-card"
      >
        <Row gutter={24}>
          <Col span={12}>
            <ProFormText
              name="name"
              label="接口名称"
              readonly
              initialValue={apiInfo.name}
              fieldProps={{
                placeholder: '接口名称',
              }}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              name="method"
              label="请求方式"
              readonly
              initialValue={apiInfo.method}
              valueEnum={{
                GET: { text: 'GET', status: 'Success' },
                POST: { text: 'POST', status: 'Processing' },
                PUT: { text: 'PUT', status: 'Warning' },
                DELETE: { text: 'DELETE', status: 'Error' },
                PATCH: { text: 'PATCH', status: 'Default' },
              }}
            />
          </Col>
          <Col span={24}>
            <ProFormText
              name="description"
              label="接口描述"
              readonly
              initialValue={apiInfo.description}
              fieldProps={{
                placeholder: '接口描述',
              }}
            />
          </Col>
          <Col span={24}>
            <ProFormText
              name="url"
              label="接口地址"
              readonly
              initialValue={apiInfo.url}
              fieldProps={{
                placeholder: '接口地址',
              }}
            />
          </Col>
        </Row>
      </ProCard>

      <ProForm
        layout="horizontal"
        onFinish={handleDebug}
        submitter={{
          render: (_, dom) => (
            <div style={{ textAlign: 'center', margin: '24px 0' }}>
              <Button
                type="primary"
                icon={<SendOutlined />}
                htmlType="submit"
                loading={loading}
                size="large"
                style={{ width: 200 }}
              >
                {loading ? '调试中...' : '开始调试'}
              </Button>
            </div>
          ),
        }}
        initialValues={{
          requestParams: parseJsonString(apiInfo.requestParams),
          requestHeader: parseJsonString(apiInfo.requestHeader),
        }}
      >
        <ProCard
          title="请求配置"
          bordered
          headerBordered
          className="request-config-card"
        >
          <ProFormDependency name={['method']}>
            {({ method }) => (
              <Tabs activeKey={activeKey} onChange={setActiveKey}>
                <TabPane
                  tab="请求参数"
                  key="params"
                  disabled={method === 'GET' ? false : true}
                >
                  {method === 'GET' ? (
                    <ProFormGroup>
                      <ProFormList
                        name="requestParams"
                        label="URL参数"
                        creatorButtonProps={{
                          creatorButtonText: '添加参数',
                        }}
                      >
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Row gutter={16}>
                            <Col span={8}>
                              <ProFormText name="key" label="参数名" />
                            </Col>
                            <Col span={8}>
                              <ProFormText name="value" label="参数值" />
                            </Col>
                            <Col span={8}>
                              <ProFormText name="description" label="描述" />
                            </Col>
                          </Row>
                        </Space>
                      </ProFormList>
                    </ProFormGroup>
                  ) : (
                    <div style={{ textAlign: 'center', padding: 24 }}>
                      <Title level={4} type="secondary">
                        {method} 请求通常使用请求体传递参数
                      </Title>
                      <p>请切换到"请求体"标签页设置参数</p>
                    </div>
                  )}
                </TabPane>

                <TabPane
                  tab="请求体"
                  key="body"
                  disabled={method === 'GET' ? true : false}
                >
                  {method !== 'GET' ? (
                    <ProFormField name="requestParams" label="请求体内容">
                      <Input.TextArea
                        rows={8}
                        placeholder="请输入JSON格式的请求体"
                        style={{ fontFamily: 'monospace' }}
                      />
                    </ProFormField>
                  ) : (
                    <div style={{ textAlign: 'center', padding: 24 }}>
                      <Title level={4} type="secondary">
                        GET 请求通常不使用请求体
                      </Title>
                      <p>请切换到"请求参数"标签页设置URL参数</p>
                    </div>
                  )}
                </TabPane>

                <TabPane tab="请求头" key="headers">
                  <ProFormList
                    name="requestHeader"
                    label="请求头"
                    creatorButtonProps={{
                      creatorButtonText: '添加请求头',
                    }}
                  >
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Row gutter={16}>
                        <Col span={8}>
                          <ProFormText name="key" label="Header名称" />
                        </Col>
                        <Col span={16}>
                          <ProFormText name="value" label="Header值" />
                        </Col>
                      </Row>
                    </Space>
                  </ProFormList>
                </TabPane>
              </Tabs>
            )}
          </ProFormDependency>
        </ProCard>
      </ProForm>

      {responseData && (
        <ProCard
          title="调试结果"
          bordered
          headerBordered
          className="response-card"
        >
          <Collapse defaultActiveKey={['1']} ghost>
            <Panel header="响应状态" key="1">
              <div className="response-status">
                <div>
                  <span className="status-label">状态码:</span>
                  <span
                    className={`status-code ${responseData.status < 300 ? 'success' : responseData.status < 400 ? 'warning' : 'error'}`}
                  >
                    {responseData.status}
                  </span>
                </div>
                <div>
                  <span className="status-label">响应时间:</span>
                  <span className="status-value">
                    {responseData.responseTime} ms
                  </span>
                </div>
              </div>
            </Panel>

            <Panel header="响应头" key="2">
              <JsonView
                src={responseData.headers || {}}
                name={false}
                displayDataTypes={false}
                theme="monokai"
                style={{
                  padding: 16,
                  borderRadius: 4,
                  backgroundColor: '#2a2a2a',
                }}
              />
            </Panel>

            <Panel header="响应体" key="3">
              <JsonView
                src={responseData.data || responseData.error}
                name={false}
                displayDataTypes={false}
                theme="monokai"
                style={{
                  padding: 16,
                  borderRadius: 4,
                  backgroundColor: '#2a2a2a',
                }}
              />
            </Panel>
          </Collapse>
        </ProCard>
      )}
    </PageContainer>
  );
};

export default ApiDebugPage;
