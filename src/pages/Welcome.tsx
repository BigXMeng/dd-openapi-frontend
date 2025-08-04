import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {Button, Card, theme} from 'antd';
import React from 'react';
import { Image } from 'antd';
import ProList from "@ant-design/pro-list/lib";

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

const dataSource = [
  {
    id: 1,
    title: '系统架构图',
    imageUrl: 'https://bigbigmeng-cd-f-1317734527.cos.ap-chengdu.myqcloud.com/dd-openapi/202508/34be6192-9568-43df-99fc-b06bd82ae6cf.png',
    content: '系统架构分为五大模块，分别为后端主体模块、API服务提供模块、用户权限模块、SDK模块、前端模块（AntDesignPro）。其中，用户权限模块会向网关、后端主体模块、API提供模块提供查询用户信息的Dubbo服务；用户主体模块会向API提供模块提供API调用计数的Dubbo服务。'
  },
  {
    id: 2,
    title: '系统用例图',
    imageUrl: 'https://bigbigmeng-cd-f-1317734527.cos.ap-chengdu.myqcloud.com/dd-openapi/202508/6021b7f1-e990-4228-91b3-ae10b8507081.png',
    content: '系统用例包括管理员和普通用户。管理员用例包括对要开放的API进行发布、下线、在线调试、SDK上传、接口调用统计分析；用户用例包括接口查看、申请调用额度、申请APIKey在线调试、下载SDK在代码中调用接口等。'
  },
];

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        styles={{
          body: {
            backgroundImage:
              initialState?.settings?.navTheme === 'realDark'
                ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          },
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用OpenApiHub
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            开放API接口提供平台，为开发人员提供三方接口，提升开发效率，节省开发成本。用户可以注册登录并开通接口调用权限，浏览接口在线调试、在客户端使用SDK轻松调用接口。
          </p>
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            系统架构
          </div>
        </div>

        <ProList<{ title: string; imageUrl: string; content: string }>
          itemLayout="vertical"
          rowKey="id"
          dataSource={dataSource}
          metas={{
            title: {
              render: (_, record) => <div>{record.title}</div>,
            },
            extra: {
              render: (_: any, record: { imageUrl: string | undefined; }) => (
                <Image
                  width={700}
                  src={record.imageUrl}
                  alt="图片"
                />
              ),
            },
            content: {
              render: (_, record) => (
                <div>
                  {record.content}
                </div>
              ),
            },
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default Welcome;
