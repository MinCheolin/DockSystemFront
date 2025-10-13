import { useState } from "react";
import { Form } from "antd";
import SafetyBoardPresenter from "./SafetyBoardPresenter";
const SafetyBoardContainer = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const showAddModal = () => setIsModalVisible(true);
  const handleAddCancel = () => setIsModalVisible(false);
  const [form] = Form.useForm();
  const handleAdd = (values) => {
    const file = values.image?.fileList?.[0] || null;
    const newData = {
      key: (data.length + 1).toString(),
      date: values.date.format("YYYY-MM-DD"),
      title: values.title,
      category: values.category,
      reporter: values.reporter,
      description: values.description,
      image: file ? URL.createObjectURL(file.originFileObj) : null,
    };
    setData([...data, newData]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    { title: "날짜", dataIndex: "date", key: "date" },
    { title: "제목", dataIndex: "title", key: "title" },
    { title: "카테고리", dataIndex: "category", key: "category" },
    { title: "작성자", dataIndex: "reporter", key: "reporter" },
  ];

  return (
    <SafetyBoardPresenter
      form={form}
      data={data}
      columns={columns}
      selectedRecord={selectedRecord}
      isModalVisible={isModalVisible}
      setSelectedRecord={setSelectedRecord}
      handleAdd={handleAdd}
      showAddModal={showAddModal}
      handleAddCancel={handleAddCancel}
    />
  );
};

export default SafetyBoardContainer;
