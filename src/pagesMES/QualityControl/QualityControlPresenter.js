import { Segmented, Table, Button, InputNumber } from "antd";
import "./qualityControl.css";

const columns = [
  {
    title: "작업지시명",
    dataIndex: ["workOrder", "woName"],
    key: "woName",
  },
  {
    title: "결과물",
    dataIndex: ["stock", "stockName"],
    key: "stockName",
  },
  {
    title: "갯수",
    dataIndex: "totalQuantity",
    key: "totalQuantity",
  },
  {
    title: "정상",
    dataIndex: "successQuantity",
    key: "successQuantity",
  },
  {
    title: "불량",
    dataIndex: "faultQuantity",
    key: "faultQuantity",
  },
];

const QualityControlPresenter = ({
  qualityControls,
  HandleChangeQuantity,
  HandleUpdateQualityControl,
  value,
  setValue,
}) => {
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
                      defaultValue={0}
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
                      defaultValue={0}
                      onChange={(value) =>
                        HandleChangeQuantity(qc.qcNo, "faultyQuantity", value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="card-btn-area">
                <Button
                  onClick={() =>
                    HandleUpdateQualityControl(
                      qc.totalQuantity,
                      qc.stock.stockNo
                    )
                  }
                >
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
