import { useState } from 'react';
import { useRequest } from 'ahooks';
import { postUploadFile } from '../../apis';
import { message, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const MAX_FILE_SIZE_MB = 20; // 文件最大大小限制（MB）

const FilePage = () => {
  const [fileList, setFileList] = useState<any[]>([]);

  // 文件上传逻辑
  const { run: handleUpload, loading } = useRequest(postUploadFile, {
    manual: true,
    onSuccess: () => {
      message.success('文件上传成功');
      setFileList([]); // 上传成功后清空文件列表
    },
    onError: (error) => {
      console.log('error', error)
      message.error('文件上传失败');
    },
  });

  // 处理文件选择时的大小校验
  const handleBeforeUpload = (file: File) => {
    const isLt20M = file.size / 1024 / 1024 < MAX_FILE_SIZE_MB;
    if (!isLt20M) {
      message.error(`文件大小必须小于 ${MAX_FILE_SIZE_MB}MB!`);
      return Upload.LIST_IGNORE;
    }
    setFileList([file]);
    return false; // 阻止自动上传
  };

  // 点击上传按钮时手动上传
  const handleSubmit = () => {
    if (fileList.length === 0) {
      message.error('请选择一个文件');
      return;
    }
    const formData = new FormData();
    formData.append('file', fileList[0]);
    handleUpload(formData);
  };

  return (
    <div>
      <h2>文件下载页面</h2>
      <a href={`${import.meta.env.VITE_APP_API_URL}/file/download`}>
        下载文件
      </a>
      <h2>上传文件</h2>
      <Upload
        beforeUpload={handleBeforeUpload}
        fileList={fileList}
        onRemove={() => setFileList([])}  // 移除文件时清空列表
      >
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleSubmit}
        disabled={fileList.length === 0 || loading}
        loading={loading}
      >
        {loading ? '上传中...' : '上传文件'}
      </Button>
    </div>
  );
};

export default FilePage;
