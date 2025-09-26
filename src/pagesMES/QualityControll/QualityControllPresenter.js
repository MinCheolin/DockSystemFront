import { useState } from "react";
import { Segmented, Card, Button } from "antd";

import "./qualityControll.css";

const QualityControllPresenter = () => {
  const [value, setValue] = useState("검사 대기");
  return (
    <div className="quality-content">
      <div className="grid-func">
        <div className="header-phrase">
          <div>품질 검사</div>
          <Segmented
            options={["검사 대기", "검사 완료"]}
            value={value}
            onChange={setValue}
          />
        </div>
        <div className="func-button"></div>
      </div>
      <div className="quality-list">
        <Card title="작업 지시 명" variant="borderless" style={{ width: 300 }}>
          <p>Card content</p>
          <div className="card-btn-area">
            <Button>통과</Button>
            <Button>불량</Button>
          </div>
        </Card>
        <Card title="작업 지시 명" variant="borderless" style={{ width: 300 }}>
          <p>Card content</p>
          <div className="card-btn-area">
            <Button>통과</Button>
            <Button>불량</Button>
          </div>
        </Card>
        <Card title="작업 지시 명" variant="borderless" style={{ width: 300 }}>
          <p>Card content</p>
          <div className="card-btn-area">
            <Button>통과</Button>
            <Button>불량</Button>
          </div>
        </Card>
        <Card title="작업 지시 명" variant="borderless" style={{ width: 300 }}>
          <p>Card content</p>
          <div className="card-btn-area">
            <Button>통과</Button>
            <Button>불량</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QualityControllPresenter;
