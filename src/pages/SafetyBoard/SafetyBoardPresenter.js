import "./safetyboard.css";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const SafetyBoardPresenter = ({
  form,
  data,
  columns,
  selectedRecord,
  isModalVisible,
  setSelectedRecord,
  handleAdd,
  showAddModal,
  handleAddCancel,
}) => {
  return (
    <div className="board-content">
      <div className="grid-func">
        <h2>안전 사고 게시판</h2>
        <Button
          type="primary"
          onClick={showAddModal}
          style={{ marginBottom: 16 }}
        >
          사고 등록
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => setSelectedRecord(record),
        })}
        rowClassName={() => "clickable-row"}
      />

      <Modal
        title="사고 등록"
        open={isModalVisible}
        onCancel={handleAddCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAdd} layout="vertical">
          <Form.Item
            name="date"
            label="날짜"
            rules={[{ required: true, message: "날짜를 입력하세요" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="title"
            label="제목"
            rules={[{ required: true, message: "제목을 입력하세요" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="카테고리"
            rules={[{ required: true, message: "카테고리를 선택하세요" }]}
          >
            <Select placeholder="카테고리 선택">
              <Option value="작업장">작업장</Option>
              <Option value="사무실">사무실</Option>
              <Option value="기타">기타</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="reporter"
            label="작성자"
            rules={[{ required: true, message: "작성자를 입력하세요" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="상세 내용"
            rules={[{ required: true, message: "상세 내용을 입력하세요" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="image" label="사고 이미지">
            <Upload
              name="file"
              listType="picture"
              maxCount={undefined}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>이미지 선택</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              등록
            </Button>
            <Button onClick={handleAddCancel}>취소</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="사고 상세"
        open={!!selectedRecord}
        onCancel={() => setSelectedRecord(null)}
        footer={null}
      >
        {selectedRecord && (
          <div>
            <p>
              <strong>날짜:</strong> {selectedRecord.date}
            </p>
            <p>
              <strong>제목:</strong> {selectedRecord.title}
            </p>
            <p>
              <strong>카테고리:</strong> {selectedRecord.category}
            </p>
            <p>
              <strong>작성자:</strong> {selectedRecord.reporter}
            </p>
            <p>
              <strong>상세 내용:</strong> {selectedRecord.description}
            </p>
            {selectedRecord.image && (
              <img
                src={selectedRecord.image}
                alt="사고 이미지"
                style={{ width: "100%", marginTop: 10 }}
              />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SafetyBoardPresenter;
