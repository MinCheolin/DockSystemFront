import { Button, Table, Modal, Form, Input, Select, InputNumber } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./stock.css";

const columns = [
  { title: "번호", key: "index", render: (text, record, index) => index + 1 },
  {
    title: "재고명",
    dataIndex: "stockName",
    key: "stockName",
  },
  {
    title: "총 갯수",

    key: "totalQuantity",
    render: (_, record) => {
      const total = (record.normalCount || 0) + (record.errorCount || 0);
      return total;
    },
  },
  { title: "정상", dataIndex: "normalCount", key: "normalCount" },
  {
    title: "불량",
    dataIndex: "errorCount",
    key: "clienerrorCounttCeo",
  },
];

const StockPresenter = ({
  stocks,
  isModalOpen,
  HandleModalStatusChange,
  HandleChangeInput,
  HandleCreateStock,
}) => {
  return (
    <div className="stock-content">
      <div className="grid-func">
        <div className="stock-list"> 재고 목록</div>
        <div className="func-button">
          <Button onClick={HandleModalStatusChange}>재고 품목 추가</Button>
          <Button>삭제</Button>
        </div>
      </div>
      <div className="grid-box">
        <Table columns={columns} dataSource={stocks}></Table>
      </div>

      <Modal
        destroyOnClose
        open={isModalOpen}
        footer={null}
        onCancel={HandleModalStatusChange}
      >
        <div className="modal-input-area">
          <div className="modal-header"> 재고 품목 추가</div>
          <div className="modal-body">
            <div className="modal-body-row">
              <div className="item-name">재고 품목명 : </div>
              <div className="item-input">
                <Input
                  name="stockName"
                  onChange={HandleChangeInput}
                  placeholder="재고 품목명을 입력하세요."
                />
              </div>
            </div>
            <div className="modal-body-row">
              <div className="item-name">정상품 갯수 : </div>
              <div className="item-input">
                <InputNumber
                  onChange={(value) =>
                    HandleChangeInput({
                      target: { name: "normalCount", value },
                    })
                  }
                  placeholder="숫자만 입력가능합니다."
                  min={0}
                  defaultValue={0}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="modal-body-row">
              <div className="item-name">불량품 갯수 : </div>
              <div className="item-input">
                <InputNumber
                  onChange={(value) =>
                    HandleChangeInput({ target: { name: "errorCount", value } })
                  }
                  placeholder="숫자만 입력가능합니다."
                  min={0}
                  defaultValue={0}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <Button onClick={HandleCreateStock}>추가</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StockPresenter;
