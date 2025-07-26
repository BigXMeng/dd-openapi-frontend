/* CreateForm.tsx
 * 新建接口表单组件
 * 功能：点击「新建」按钮弹出 Modal 表单，填写接口信息后提交到后端 /interface/add 接口
 * 依赖：@ant-design/pro-components、@umijs/max、react、antd
 */

// 业务接口：真正向后端发送新增接口请求的函数
import {update} from '@/services/dd-openapi-main/apiInfoController';
// Ant Design 图标
// ProComponents 表单控件
import {ModalForm} from "@ant-design/pro-form";
import {ProFormSelect, ProFormText, ProFormTextArea} from "@ant-design/pro-components";
// Umi 封装的 useRequest，用于发请求、管理 loading、错误处理
import {useRequest} from '@umijs/max';
// Ant Design 基础组件
import {Form} from 'antd';
import React, {FC} from 'react';

interface UpdateFormProps {
    /** 当前行数据，用于回填 */
    values: API.InterfaceInfoVO;
    /** 编辑成功后刷新表格 */
    reload?: () => void;
    /** 触发元素，默认“编辑”链接 */
    trigger?: React.ReactNode;
}

const UpdateForm: FC<UpdateFormProps> = ({values, reload, trigger}) => {
    /* ----------------- 表单实例 ----------------- */
    const [form] = Form.useForm<API.InterfaceInfoUpdateReq>();

    /* ----------------- 请求逻辑 ----------------- */
    // 编辑接口
    const {run, loading} = useRequest(update, {
        manual: true,
        onSuccess: () => {
            reload?.();        // 刷新表格
        },
    });

    /* ----------------- 渲染 ----------------- */
    return (
        <ModalForm<API.InterfaceInfoUpdateReq>
            title="编辑接口"
            /* 触发器：支持自定义，默认“编辑” */
            trigger={trigger ?? <a>编辑</a>}
            form={form}
            width={600}
            /* 打开弹窗时把当前行数据写进表单 */
            modalProps={{
                destroyOnHidden: true,  // 关闭即销毁，防止旧数据残留
            }}
            onOpenChange={(open) => {
                if (open) {
                    // 打开时回填；注意字段名要和表单一致
                    form.setFieldsValue({
                        name: values.name,
                        description: values.description,
                        url: values.url,
                        method: values.method,
                        requestParams: values.requestParams,
                        requestHeader: values.requestHeader,
                        responseHeader: values.responseHeader,
                        status: values.status,
                    });
                }
            }}
            onFinish={async (formData) => {
                /* 合并 id 后提交 */
                // @ts-ignore
              await run({...formData, id: values.id});
                return true;   // 关闭弹窗
            }}
        >
            {/* 以下字段与新增保持一致，回填时会自动赋值 */}
            <ProFormText
                name="name"
                label="接口名称"
                rules={[{required: true, message: '接口名称不能为空'}]}
            />
            <ProFormTextArea
                name="description"
                label="接口描述"
                rows={3}
            />
            <ProFormText
                name="url"
                label="接口地址"
                rules={[{required: true, message: '接口地址不能为空'}]}
            />
            <ProFormSelect
                name="method"
                label="请求方法"
                valueEnum={{
                    GET: 'GET',
                    POST: 'POST',
                    PUT: 'PUT',
                    DELETE: 'DELETE',
                }}
                rules={[{required: true, message: '必须选择请求方法'}]}
            />
            <ProFormTextArea
                name="requestParams"
                label="请求参数"
                rules={[{required: true, message: '请输入请求参数'}]}
                rows={4}
            />
            <ProFormTextArea
                name="requestHeader"
                label="请求头"
                rows={3}
            />
            <ProFormTextArea
                name="responseHeader"
                label="响应头"
                rows={3}
            />
            <ProFormSelect
                name="status"
                label="接口状态"
                valueEnum={{
                    0: '下线',
                    1: '上线',
                }}
                rules={[{required: true, message: '必须选择接口状态'}]}
            />
        </ModalForm>
    );
};

export default UpdateForm;
