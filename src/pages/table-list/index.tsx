import { removeRule, rule } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {deleteUsingDelete, page} from "@/services/dd-openapi-main/interfaceInfoController";
const TableList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [interfaceRow, setInterfaceRow] = useState<API.InterfaceInfoVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfoVO[]>([]);

  const [messageApi, contextHolder] = message.useMessage();
  const { run: delRun, loading } = useRequest(removeRule, {
    manual: true,
    onSuccess: () => {
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();
      messageApi.success('Deleted successfully and will refresh soon');
    },
    onError: () => {
      messageApi.error('Delete failed, please try again');
    },
  });
  const columns: ProColumns<API.InterfaceInfoVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      search: false, // 不在查询表单显示
      hideInForm: true, // 不在表单中显示（如果使用ModalForm）
      hideInTable: false // 明确在表格中显示（默认值，可省略）
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
      dataIndex: 'userId',
      valueType: 'textarea',
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: 'textarea',
    },
    // {
    //   title: '服务调用次数',
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   hideInForm: true,
    //   renderText: (val: string) => `${val}${'万'}`,
    // },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: { text: '关闭', status: 'Error' },
        1: { text: '运行中', status: 'Success' },
      },
    },
    // {
    //   title: '上次调度时间',
    //   sorter: true,
    //   dataIndex: 'updatedAt',
    //   valueType: 'dateTime',
    //   renderFormItem: (item, { defaultRender, ...rest }, form) => {
    //     const status = form.getFieldValue('status');
    //     if (`${status}` === '0') {
    //       return false;
    //     }
    //     if (`${status}` === '3') {
    //       return <Input {...rest} placeholder={'请输入异常原因！'} />;
    //     }
    //     return defaultRender(item);
    //   },
    // },
    {
      title: '方法',
      dataIndex: 'method',
      valueType: 'select',
      valueEnum: {
        GET: { text: 'GET' },
        POST: { text: 'POST' },
        PUT: { text: 'PUT' },
        DELETE: { text: 'DELETE' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <UpdateForm
          trigger={<a>配置</a>}
          key="config"
          onOk={actionRef.current?.reload}
          values={record}
        />,
        // <a key="subscribeAlert" href="https://procomponents.ant.design/">
        //   订阅警报
        // </a>,
      ],
    },
  ];

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = useCallback(
    async (selectedRows: API.InterfaceInfoVO[]) => {
      if (!selectedRows?.length) {
        message.warning('请选择要删除的项');
        return;
      }
      try {
        // 构造符合 InterfaceInfoDeleteReq 的请求参数
        const deleteRequest: API.InterfaceInfoDeleteReq = {
          ids: selectedRows.map(row => row.id).filter(Boolean) as number[] // 过滤掉可能的 undefined
        };
        await deleteUsingDelete(deleteRequest);
        message.success('删除成功');
        actionRef.current?.reload(); // 刷新表格
        setSelectedRows([]); // 清空选中状态
      } catch (error) {
        message.error('删除失败');
      }
    },
    [deleteUsingDelete, actionRef, message]
  );

  return (
    <PageContainer>
      {contextHolder}
      <ProTable<API.InterfaceInfoVO>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [<CreateForm key="create" reload={actionRef.current?.reload} />]}
        request={async (params, sort, filter) => {
          // 构造符合 InterfaceInfoQueryReq 的请求参数
          const requestBody: API.InterfaceInfoQueryReq = {
            pageParams: {
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
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计{' '}
                {selectedRowsState.reduce((pre, item) => pre + (item.userId ?? 0), 0)} 万
              </span>
            </div>
          }
        >
          <Button
            loading={loading}
            onClick={() => {
              handleRemove(selectedRowsState);
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}

      {/*<Drawer*/}
      {/*  width={600}*/}
      {/*  open={showDetail}*/}
      {/*  onClose={() => {*/}
      {/*    setInterfaceRow(undefined);*/}
      {/*    setShowDetail(false);*/}
      {/*  }}*/}
      {/*  closable={false}*/}
      {/*>*/}
      {/*  {interfaceRow?.name && (*/}
      {/*    <ProDescriptions<API.InterfaceInfoVO>*/}
      {/*      column={2}*/}
      {/*      title={interfaceRow?.name}*/}
      {/*      request={async () => ({*/}
      {/*        data: interfaceRow || {},*/}
      {/*      })}*/}
      {/*      params={{*/}
      {/*        id: interfaceRow?.name,*/}
      {/*      }}*/}
      {/*      columns={columns as ProDescriptionsItemProps<API.InterfaceInfoVO>[]}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</Drawer>*/}
    </PageContainer>
  );
};
export default TableList;
