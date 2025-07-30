import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable,} from '@ant-design/pro-components';
import {App} from 'antd';
import React, {useRef, useState} from 'react';
import {page} from "@/services/dd-openapi-main/apiInfoController";
import {history} from "@@/core/history";
import EnableInvokeModal, { EnableInvokeModalRef } from '@/pages/interface/components/EnableInvokeModal';
import UpdateForm from "@/pages/interface/components/UpdateForm";

const TableList: React.FC = () => {
  const enableInvokeModalRef = useRef<EnableInvokeModalRef>(null);
  const {message} = App.useApp();   // ← 不再从 antd 直接引入
  const actionRef = useRef<ActionType | null>(null);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [interfaceRow, setInterfaceRow] = useState<API.InterfaceInfoVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfoVO[]>([]);

  const handleDebug = (record: API.InterfaceInfoVO) => {
    // 跳转到调试页面，携带接口数据作为状态
    history.push({
      pathname: `/interface/debug/${record.id}`,
    });
  };

  const columns: ProColumns<API.InterfaceInfoVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      search: false, // 不在查询表单显示
      hideInForm: true, // 不在表单中显示（如果使用ModalForm）
      hideInTable: true // 明确在表格中显示（默认值，可省略）
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setInterfaceRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '接口描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '创建人',
      dataIndex: 'userAccount',
      valueType: 'textarea',
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      search: false,
      valueEnum: {
        0: {text: '已下线', status: 'Error'},
        1: {text: '上线中', status: 'Success'},
      },
    },
    {
      title: '方法',
      dataIndex: 'method',
      valueType: 'select',
      valueEnum: {
        GET: {text: 'GET'},
        POST: {text: 'POST'},
        PUT: {text: 'PUT'},
        DELETE: {text: 'DELETE'},
      },
    },
    {
      title: '可调用',
      render: (_, record) => `${record.userInterfaceInvokeInfoVO?.invokeLeftNum ?? '0'}次`, // 拼接"次"
      valueType: 'textarea',
    },
    {
      title: '已调用',
      render: (_, record) => `${record.userInterfaceInvokeInfoVO?.invokedNum ?? '0'}次`, // 拼接"次"
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key="debug" onClick={() => handleDebug(record)}>
          在线调试
        </a>,
        <a key="debug" onClick={() => {
          enableInvokeModalRef.current?.handleEnableInvoke(record);
          // 刷新分页列表
          actionRef.current?.reload();
        }}>
          开通调用次数
        </a>,
      ],
    }
  ];

  return (
    <PageContainer>
      {/*{contextHolder}*/}
      <ProTable<API.InterfaceInfoVO>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        // toolBarRender={() => [<CreateForm key="create" reload={actionRef.current?.reload}/>]}
        request={async (params, sort, filter) => {
          // 构造符合 InterfaceInfoQueryReq 的请求参数
          const requestBody: API.InterfaceInfoQueryReq = {
            pageParams: {
              // @ts-ignore
              pageNum: params.current,
              pageSize: params.pageSize,
            },
            queryParams: {
              ids: params.ids,
              name: params.name,
              url: params.url,
              method: params.method,
              status: params.status,
              // 日期范围已通过 search.transform 映射为 createTimeRange
              ...params, // 其他字段自动匹配（需确保 InterfaceInfoQueryParams 有对应字段）
            },
          };
          // 调用后端接口
          const res = await page(requestBody);
          return {
            data: res.data?.records || [], // 假设返回数据在 records 字段
            total: res.data?.total || 0,   // 总条数
            success: true,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      <EnableInvokeModal
        ref={enableInvokeModalRef}
        /* 正确返回后更新当前列表 */
        onSuccess={() => {
          actionRef.current?.reload(); // 在这里调用刷新
        }}
      />
    </PageContainer>
  );
};
export default TableList;
