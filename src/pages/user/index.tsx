import React, { useEffect, useState } from 'react';
import {Table, Button, Modal, Form, Input, message, Flex, InputNumber} from 'antd';
import { getUsers, putEditUser, postCreateUser, deleteUser, User } from '../../apis'; // 导入请求方法
import { useRequest } from 'ahooks'; // 导入 useRequest
import './index.less';

const UserList: React.FC = () => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { refresh, data } = useRequest(getUsers, {
    manual: true,
    onError: () => {
      console.log('error')
    },
  });

  const users = data?.data;

  const { run: createOrEditUser, loading: isSubmitting } = useRequest(
    async (values: User) => {
      if (editingUser) {
        await putEditUser({ ...editingUser, ...values });
        message.success('用户信息更新成功');
      } else {
        await postCreateUser(values);
        message.success('用户创建成功');
      }
      setIsModalVisible(false);
      setEditingUser(null);
      form.resetFields();
      refresh();
    },
    {
      manual: true,
      onError: (error) => {
        console.log('error', error)
      },
    }
  );

  const handleDelete = async (user: User) => {
    Modal.confirm({
      title: '确认删除',
      content: `确认删除用户 ${user.name}?`,
      onOk: async () => {
        try {
          await deleteUser({ id: user.id });
          message.success('用户删除成功');
          refresh();
        } catch (error) {
          console.log('error', error)
        }
      },
    });
  };

  const handleModalOpen = (user?: User) => {
    if (user) {
      setEditingUser(user);
      form.setFieldsValue(user);
    } else {
      setEditingUser(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '年龄', dataIndex: 'age', key: 'age', render: (d) => d || '--' },
    {
      title: '操作',
      key: 'action',
      render: (_, user: User) => (
        <>
          <Button onClick={() => handleModalOpen(user)} type="link">编辑</Button>
          <Button onClick={() => handleDelete(user)} type="link" danger>删除</Button>
        </>
      ),
    },
  ];

  return (
    <div className="user-manage-page">
      <div className="button-container">
        <Button type="primary" onClick={() => handleModalOpen()} className="user-manage-page-create">
          新增用户
        </Button>
      </div>
      <Table dataSource={users} columns={columns} rowKey="id" />
      <Modal
        title={editingUser ? '编辑用户' : '新增用户'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={createOrEditUser} layout="vertical">
          <Form.Item
            name="name"
            label="姓名"
            required
            rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            required
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱格式' },
            ]}>
            <Input placeholder="请输入邮箱"  />
          </Form.Item>
          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: false, message: '请输入年龄' }]}>
            <InputNumber min={1} style={{width: '100%'}}  placeholder="请输入年龄"  />
          </Form.Item>
          <Form.Item>
            <Flex align="center" justify="center">
              <Button size="large" type="primary" htmlType="submit" loading={isSubmitting}>
                {editingUser ? '保存用户' : '创建用户'}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
