import {SendOutlined} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import {Button, Col, Collapse, Input, message, Row, Space, Tabs, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {useLocation} from 'umi';
import JsonView from 'react-json-view';
import './index.less';
import {get} from '@/services/dd-openapi-main/apiInfoController';
import {ProFormGroup} from "@ant-design/pro-form/lib";
import {ProFormField} from "@ant-design/pro-form";
import {callGeneStrApi} from "@/services/dd-openapi-main/apiClientController";
import {getCurrentUserInfo} from "@/services/dd-ms-auth/authController";

const { Title } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const ApiDebugPage = () => {
  const location = useLocation();
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState('params');
  // 接口信息VO
  const [apiInfo, setApiInfo] = useState<API.InterfaceInfoVO>({});
  // 自定义请求头
  const [apiKey, setApiKey] = useState<API.ApiKeyHeaders>({});

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
    try {
      // TODO 如何处理不同API的调用？使用Set容器？
      if (apiInfo.url?.includes("/ui-client/call-api/gene-str-api")) {
        const apiResponse = await callGeneStrApi();
        console.log("apiResponse = ", apiResponse);
        if (apiResponse.code != 200) {
          console.log("API调用失败, apiResponse = ", apiResponse);
        }
        setResponseData({
          status: responseData.code,
          data: apiResponse.data,
          responseTime: responseData.responseTime,
          headers: responseData.headers,
        });
        console.log("responseData = ", responseData);
        message.success('接口调试成功');
      }
    } catch (error) {
      setResponseData({
        status: 500,
        error: "请求失败，请检查网络连接或API配置"
      });
    } finally {
      setLoading(false);
    }
  };

  // 获取接口ID并调用详情接口
  useEffect(() => {
    const fetchInterfaceData = async () => {
      try {
        setLoading(true);
        // 从路由参数获取接口ID
        const interfaceId = location.pathname.split('/').pop();
        if (!interfaceId) {
          throw new Error('未获取到接口ID');
        }
        // 调用get方法获取接口详情
        const response = await get(interfaceId);
        console.log("/interface-api/interface/get/id rst = ", response);
        if (response.code === 200) {
          // @ts-ignore
          setApiInfo(response.data);
        } else {
          throw new Error(response.message || '获取接口详情失败');
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchInterfaceData();

    // 初始化用户的apiKey
    const initApiKey = async () => {
      try {
        const respUserVO = await getCurrentUserInfo();
        if (respUserVO != null && respUserVO.code == 200) {
          setApiKey({
            accessKey: respUserVO.data?.accessKey,
            secretKey: respUserVO.data?.secretKey,
          });
        }
      } catch (err) {
        console.error('用户信息接口详情失败:', err);
        // @ts-ignore
        message.error(err.message || '用户信息接口详情失败');
      }
    };
    initApiKey();
  }, [location]);

  return (
    <PageContainer
      className="api-debug-page"
      header={{
        title: (
          <Title level={2} style={{ margin: 0 }}>
            {apiInfo.name}
          </Title>
        ),
        breadcrumb: {},
      }}
    >
      <ProCard
        title="API基本信息"
        bordered
        className="api-info-card"
      >
        <Row gutter={24}>
          <Col span={12}>
            <ProFormText
              name="name"
              label="接口名称"
              readonly
              fieldProps={{
                value: apiInfo.name, // 绑定到 apiInfo.name
                placeholder: '接口名称',
              }}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              name="method"
              label="请求方式"
              readonly
              fieldProps={{
                value: apiInfo.method, // 绑定到 apiInfo.method
              }}
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
              fieldProps={{
                value: apiInfo.description, // 绑定到 apiInfo.description
                placeholder: '接口描述',
              }}
            />
          </Col>
          <Col span={24}>
            <ProFormText
              name="url"
              label="接口地址"
              readonly
              fieldProps={{
                value: apiInfo.url, // 绑定到 apiInfo.url
                placeholder: '接口地址',
              }}
            />
          </Col>
          <Col span={24}>
            <div>
              <Title level={5}>请求参数描述</Title>
              </div>
              <pre style={{
                padding: 16,
                borderRadius: 4,
                backgroundColor: '#2a2a2a',
                color: '#fff',
                fontSize: '14px',
                whiteSpace: 'pre-wrap'
              }}>
                {apiInfo.requestParams}
              </pre>
          </Col>
          <Col span={24}>
            <div>
              <Title level={5}>curl请求示例（请求头accessKey、secretKey必须携带）</Title>
            </div>
            <pre style={{
              padding: 16,
              borderRadius: 4,
              backgroundColor: '#2a2a2a',
              color: '#fff',
              fontSize: '14px',
              whiteSpace: 'pre-wrap'
            }}>
      {apiInfo.requestHeader}
    </pre>
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
        // initialValues={{
        //   requestParams: parseJsonString(apiInfo.requestParams),
        //   requestHeader: parseJsonString(apiInfo.requestHeader),
        // }}
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
                  disabled={method !== 'GET'}
                >
                  {method === 'GET' ? (
                    <ProFormGroup>
                      <ProFormList
                        name="requestParams"
                        label="URL参数"
                        creatorButtonProps={{
                          creatorButtonText: '添加参数',
                        }}
                        itemRender={({listDom, action}) => (
                          <Space direction="vertical" style={{width: '100%'}}>
                            <Row gutter={16}>
                              <Col span={8}>
                                <ProFormText name="key" label="参数名"/>
                              </Col>
                              <Col span={8}>
                                <ProFormText name="value" label="参数值"/>
                              </Col>
                              <Col span={8}>
                                <ProFormText name="description" label="描述"/>
                              </Col>
                            </Row>
                            {listDom}
                            {action}
                          </Space>
                        )}
                      />
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
                  disabled={method === 'GET'}
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
                    itemRender={({listDom, action}) => (
                      <Space direction="vertical" style={{width: '100%'}}>
                        <Row gutter={16}>
                          <Col span={8}>
                            <ProFormText name="key" label="Header名称"/>
                          </Col>
                          <Col span={16}>
                            <ProFormText name="value" label="Header值"/>
                          </Col>
                        </Row>
                        {listDom}
                        {action}
                      </Space>
                    )}
                  />
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
