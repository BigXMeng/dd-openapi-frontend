/* CreateForm.tsx
 * 新建接口表单组件
 * 功能：点击「新建」按钮弹出 Modal 表单，填写接口信息后提交到后端 /interface/add 接口
 * 依赖：@ant-design/pro-components、@umijs/max、react、antd
 */

// 业务接口：真正向后端发送新增接口请求的函数
import { add } from '@/services/dd-openapi-main/interfaceInfoController';
// Ant Design 图标
import { PlusOutlined } from '@ant-design/icons';
// ProComponents 表单控件
import {ModalForm} from "@ant-design/pro-form";
import {ProFormSelect, ProFormText, ProFormTextArea} from "@ant-design/pro-components";
// Umi 封装的 useRequest，用于发请求、管理 loading、错误处理
import { useRequest } from '@umijs/max';
// Ant Design 基础组件
import { Button, Form } from 'antd';
import type { FC } from 'react';

interface CreateFormProps {
  /** 提交成功后回调，用来刷新父级表格数据 */
  reload?: () => void;
}

const CreateForm: FC<CreateFormProps> = ({ reload }) => {
  /* ----------------- 表单实例 ----------------- */
  // 通过 Form.useForm 拿到表单实例，方便手动 reset
  const [form] = Form.useForm<API.InterfaceInfoAddReq>();

  /* ----------------- 请求逻辑 ----------------- */
  // 使用 useRequest 封装 add 请求：
  // - run        : 真正触发请求的方法
  // - loading    : 请求是否进行中，用于禁用「确定」按钮
  // - onSuccess  : 请求成功后执行（提示 + 刷新父级表格 + 清空表单）
  const { run, loading } = useRequest(add, {
    manual: true,              // 手动触发
    onSuccess: () => {
      form.resetFields();      // 清空表单
      reload?.();              // 通知父组件刷新列表
    },
    onError: (e) => {
      console.error('新增接口失败', e);
    },
  });

  /* ----------------- 渲染 ----------------- */
  return (
    <ModalForm<API.InterfaceInfoAddReq>
      /* 弹窗标题 */
      title="新建接口"
      /* 触发器：页面上的「新建」按钮 */
      trigger={
        <Button type="primary" icon={<PlusOutlined />}>
          新建
        </Button>
      }
      /* 绑定表单实例 */
      form={form}
      /* 弹窗宽度 */
      width={600}
      /* 弹窗底部确认按钮属性：loading 控制禁用状态 */
      modalProps={{
        okButtonProps: { loading },
        destroyOnHidden: true, // 关闭时销毁 Modal 内元素，防止数据残留
      }}
      /* 点击「确定」时的回调：values 即为表单数据 */
      onFinish={async (values) => {
        /* 组装真正提交给后端的参数
         *  - 表单字段已全部对应 InterfaceInfoAddReq
         *  - userId 一般从登录态/全局状态拿，这里先写死 1
         */
        const payload: API.InterfaceInfoAddReq = {
          ...values,
        };
        // 调用 useRequest 返回的 run 函数
        await run(payload);
        // 返回 true 让 ModalForm 自动关闭弹窗
        return true;
      }}
    >
      {/* --------- 表单字段 --------- */}

      {/* 接口名称 */}
      <ProFormText
        name="name"
        label="接口名称"
        placeholder="请输入接口名称"
        rules={[{ required: true, message: '接口名称不能为空' }]}
      />

      {/* 接口描述（可选） */}
      <ProFormTextArea
        name="description"
        label="接口描述"
        placeholder="选填，简要描述接口用途"
        rows={3}
      />

      {/* 接口地址 */}
      <ProFormText
        name="url"
        label="接口地址"
        placeholder="例：/api/user/login"
        rules={[{ required: true, message: '接口地址不能为空' }]}
      />

      {/* 请求方法 */}
      <ProFormSelect
        name="method"
        label="请求方法"
        placeholder="请选择 HTTP 方法"
        valueEnum={{
          GET: 'GET',
          POST: 'POST',
          PUT: 'PUT',
          DELETE: 'DELETE',
        }}
        rules={[{ required: true, message: '必须选择请求方法' }]}
      />

      {/* 请求参数（JSON 字符串） */}
      <ProFormTextArea
        name="requestParams"
        label="请求参数"
        placeholder='例：{"username": "test", "password": "123456"}'
        rules={[{ required: true, message: '请输入请求参数' }]}
        rows={4}
      />

      {/* 请求头（可选 JSON 字符串） */}
      <ProFormTextArea
        name="requestHeader"
        label="请求头"
        placeholder='例：{"Content-Type":"application/json"}'
        rows={3}
      />

      {/* 响应头（可选 JSON 字符串） */}
      <ProFormTextArea
        name="responseHeader"
        label="响应头"
        placeholder='例：{"Content-Type":"application/json"}'
        rows={3}
      />

      {/* 接口状态：0=关闭 1=运行中 */}
      <ProFormSelect
        name="status"
        label="接口状态"
        placeholder="请选择接口状态"
        valueEnum={{
          0: '关闭',
          1: '运行中',
        }}
        rules={[{ required: true, message: '必须选择接口状态' }]}
      />
    </ModalForm>
  );
};

export default CreateForm;
