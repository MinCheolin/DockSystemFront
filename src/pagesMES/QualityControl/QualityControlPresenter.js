import { Segmented, Table, Button, InputNumber } from "antd";
import "./qualityControl.css";

const QualityControlPresenter = ({
  qualityControls,
  HandleChangeQuantity,
  HandleUpdateQualityControl,
  HandleReturnQualityControl,
  value,
  setValue,
}) => {
  const columns = [
    {
      title: "작업지시명",
      align: "center",
      dataIndex: ["workOrder", "woName"],
      key: "woName",
    },
    {
      title: "결과물",
      align: "center",
      dataIndex: ["stock", "stockName"],
      key: "stockName",
    },
    {
      title: "갯수",
      align: "center",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "정상",
      align: "center",
      dataIndex: "successQuantity",
      key: "successQuantity",
    },
    {
      title: "불량",
      align: "center",
      dataIndex: "faultQuantity",
      key: "faultQuantity",
    },
    {
      title: "상태",
      align: "center",
      width: 50,
      key: "status",
      render: (_, record) => (
        <Button onClick={() => HandleReturnQualityControl(record)}>
          재검사
        </Button>
      ),
    },
  ];
  const filteredQC = qualityControls.filter((qc) => qc.type === value);
  return (
    <div className="quality-content">
      <div className="grid-func">
        <div className="header-phrase">
          <div>품질 검사</div>
          <Segmented
            options={[
              { value: "대기", label: "검사 대기" },
              { value: "완료", label: "검사 완료" },
            ]}
            value={value}
            onChange={setValue}
          />
        </div>
        <div className="func-button"></div>
      </div>

      {value === "대기" ? (
        <div className="quality-list">
          {filteredQC.map((qc) => (
            <div className="qc-card-item" key={qc.qcNo}>
              <div className="qc-card-title">{qc.workOrder.woName}</div>

              <div className="item-row-container">
                <div className="item-row">
                  <div className="attribute-title">결과물 :</div>
                  <div className="item-data">{qc.stock.stockName}</div>
                </div>
                <div className="item-row">
                  <div className="attribute-title">갯수 :</div>
                  <div className="item-data">{qc.totalQuantity}</div>
                </div>
                <div className="item-row">
                  <div className="attribute-title">정상 :</div>
                  <div className="item-data">
                    <InputNumber
                      min={0}
                      value={qc.successQuantity}
                      onChange={(value) =>
                        HandleChangeQuantity(qc.qcNo, "successQuantity", value)
                      }
                    />
                  </div>
                </div>
                <div className="item-row">
                  <div className="attribute-title">불량 :</div>
                  <div className="item-data">
                    <InputNumber
                      min={0}
                      value={qc.faultQuantity}
                      max={qc.totalQuantity}
                      onChange={(value) =>
                        HandleChangeQuantity(qc.qcNo, "faultQuantity", value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="card-btn-area">
                <Button onClick={() => HandleUpdateQualityControl(qc.qcNo)}>
                  검사 완료
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredQC}
          rowKey="qcNo"
          pagination={false}
        />
      )}
    </div>
  );
};

export default QualityControlPresenter;
