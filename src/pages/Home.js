import React, { useState } from 'react';
import { Row, Col, Card, Progress,Modal,List} from 'antd';
import { Line, Pie, Column } from '@ant-design/charts';

const dummyQualityData = [
  { month: '1월', value: 94 },
  { month: '2월', value: 95 },
  { month: '3월', value: 96 },
];

const dummyProjectData = [
  { project: 'A호선', progress: 80 },
  { project: 'B호선', progress: 60 },
  { project: 'C호선', progress: 40 },
];

const dummySafetyData = [
  { type: '추락', value: 40 },
  { type: '협착', value: 30 },
  { type: '화재', value: 30 },
];

const dummyCostData = [
  { project: 'A호선', budget: 500, actual: 420 },
  { project: 'B호선', budget: 300, actual: 310 },
];

const dummyNotices = [
  {
    id: 1,
    title: '오늘 안전 점검',
    details: [
      '크레인 점검: 이상 없음',
      '용접 작업장 소화기 점검 완료',
      '보호 장비 착용 여부 확인',
    ],
  },
  {
    id: 2,
    title: 'A호선 납기 일정 변경',
    details: [
      'A호선 3월 15일까지 도장 완료',
      '용접 공정 일정 재조정 필요',
      '선체 조립팀 확인 요청',
    ],
  },
];

const QualityChart = ({ data }) => {
  const config = { data, xField: 'month', yField: 'value', smooth: true, height: 200 };
  return <Line {...config} />;
};

const ProjectProgress = ({ data }) => (
  <>
    {data.map(p => (
      <div key={p.project} style={{ marginBottom: 8 }}>
        {p.project} <Progress percent={p.progress} />
      </div>
    ))}
  </>
);

const SafetyChart = ({ data }) => {
  const config = { data, angleField: 'value', colorField: 'type', radius: 0.8, height: 200 };
  return (
    <>
      <Pie {...config} />
      <div style={{ marginTop: 16 }}>
        안전 교육 이수율: <Progress percent={85} status="active" />
      </div>
    </>
  );
};

const CostChart = ({ data }) => {
  const chartData = data.flatMap(d => [
    { project: d.project, type: '예산', value: d.budget },
    { project: d.project, type: '실제', value: d.actual },
  ]);
  const config = { data: chartData, isGroup: true, xField: 'project', yField: 'value', seriesField: 'type', height: 200 };
  return <Column {...config} />;
};

const Home = () => {
  const [qualityData] = useState(dummyQualityData);
  const [projectData] = useState(dummyProjectData);
  const [safetyData] = useState(dummySafetyData);
  const [costData] = useState(dummyCostData);
  const [activeNotice, setActiveNotice] = useState(null);

  const openModal = (notice) => setActiveNotice(notice);
  const closeModal = () => setActiveNotice(null);
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="공지사항">
          <List
            dataSource={dummyNotices}
            renderItem={(item) => (
              <List.Item>
               <button
                    type="button"
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        padding: 0, 
                        color: 'blue', 
                        textDecoration: 'underline', 
                        cursor: 'pointer' 
                    }}
                    onClick={() => openModal(item)}
                    >
                    {item.title}
                </button>

              </List.Item>
            )}
          />
        </Card>

        {/* 모달 */}
        <Modal
          title={activeNotice?.title}
          open={!!activeNotice}
          onOk={closeModal}
          onCancel={closeModal}
          okText="확인"
        >
          <ul>
            {activeNotice?.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </Modal>
      </Col>

      <Col span={12}>
        <Card title="품질율">
          <QualityChart data={qualityData} />
        </Card>
      </Col>

      <Col span={12}>
        <Card title="프로젝트 진척률">
          <ProjectProgress data={projectData} />
        </Card>
      </Col>

      <Col span={12}>
        <Card title="안전 지표">
          <SafetyChart data={safetyData} />
        </Card>
      </Col>

      <Col span={12}>
        <Card title="비용 / 예산">
          <CostChart data={costData} />
        </Card>
      </Col>
    </Row>
  );
};

export default Home;
