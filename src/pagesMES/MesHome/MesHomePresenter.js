import { useState } from "react";
import { Row, Col, Card, Modal, List } from "antd";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./mesHome.css";

const dummyNotices = [
  {
    id: 1,
    title: "작업 환경 기상 주의 안내",
    date: "2025 - 10 - 18",
    details: [
      "풍속 10m/s 이상 시 크레인 및 절단 작업 중지",
      "비/눈/안개 시 선체 도장 및 용접 작업 제한",
      "폭염 경보 시 작업 전후 충분한 휴식과 수분 섭취",
      "작업 전 날씨 확인 및 위험요인 보고 필수",
    ],
  },
  {
    id: 2,
    title: "용접 작업 안전 점검",
    date: "2025 - 10 - 18",
    details: [
      "작업 시작 전 용접기 상태 확인",
      "보호장비 착용 확인: 마스크, 장갑, 안전화",
      "주변 가연성 물질 제거",
      "작업 완료 후 용접 부위 품질 확인",
    ],
  },
  {
    id: 3,
    title: "절단 작업 안전 점검",
    date: "2025 - 10 - 18",
    details: [
      "절단기 작동 전 장비 상태 확인",
      "보호장비 착용 필수: 장갑, 안면 보호구, 안전화",
      "작업 구역 내 인원 출입 통제",
      "절단 후 잔여 재료 처리 및 안전 확인",
      "작업 완료 후 점검표 작성 및 보고",
    ],
  },
  {
    id: 4,
    title: "도장 작업 안전 점검",
    date: "2025 - 10 - 18",
    details: [
      "작업 시작 전 도장기 및 에어 공급 상태 확인",
      "작업 구역 내 안전 표지 설치 및 출입 통제",
      "보호 장비 착용 필수: 헬멧, 안전화, 보호장갑, 마스크",
      "작업 중 유해 가스/분진 방지 조치 확인",
      "작업 완료 후 도장 품질 검사 및 점검표 기록",
    ],
  },
  {
    id: 5,
    title: "크레인 이동 및 하역 작업 안내",
    date: "2025 - 10 - 18",
    details: [
      "하역 구역 통제: 안전 표지 설치",
      "작업 중 주변 인원 접근 금지",
      "작업 완료 후 장비 점검 및 보고",
    ],
  },
];

const MesHomePresenter = ({
  weather,
  cityCoordinates,
  selectedCity,
  onSelectCity,
  totalSuccess,
  totalQty,
  totalQualityRate,
}) => {
  const [activeNotice, setActiveNotice] = useState(null);
  const currentDate = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  return (
    <div className="home-content">
      <Row gutter={[16, 16]} style={{ display: "flex", flexWrap: "nowrap" }}>
        <Col span={12}>
          <Card title="공지사항">
            <List
              dataSource={dummyNotices}
              renderItem={(item) => (
                <List.Item>
                  <button
                    type="button"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveNotice(item)}
                  >
                    {item.title}
                  </button>
                  <span style={{ fontSize: "0.8rem", color: "#888" }}>
                    {item.date}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <div className="weather-container" style={{ width: "600px" }}>
            <div className="city-buttons">
              {cityCoordinates &&
                Object.entries(cityCoordinates).map(([key, { name }]) => (
                  <button
                    key={key}
                    onClick={() => onSelectCity(key)}
                    style={{
                      margin: "4px",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background:
                        selectedCity === key ? "#1677ff" : "#eef3faff",
                      color: selectedCity === key ? "#fff" : "#000",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {name}
                  </button>
                ))}
            </div>
            <div
              className="current-and-forecast"
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              {weather && weather.current && (
                <div
                  className="current-weather"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "0 0 200px",
                    background: "#dbe7f9ff",
                    borderRadius: "12px",
                    padding: "16px",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    fontSize: "16px",
                  }}
                >
                  <h3>{cityCoordinates[selectedCity].name} 현재 날씨</h3>
                  <div>온도: {weather.current.main.temp}°C</div>
                  <div>풍속: {weather.current.wind.speed}m/s</div>
                  <div>날씨: {weather.current.weather[0].description}</div>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon.replace(
                      "n",
                      "d"
                    )}@2x.png`}
                    alt="날씨 아이콘"
                  />
                </div>
              )}

              {weather && weather.forecast && (
                <div
                  className="forecast"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flex: "1",
                    gap: "8px",
                  }}
                >
                  {weather.forecast.list
                    .filter((_, idx) => idx % 8 === 0)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "#dbe7f9ff",
                          borderRadius: "10px",
                          textAlign: "center",
                          padding: "8px",
                          minWidth: "140px",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "0.75rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {new Date(item.dt_txt).toLocaleDateString("ko-KR", {
                            month: "numeric",
                            day: "numeric",
                            weekday: "short",
                          })}
                        </div>
                        <div
                          style={{ fontSize: "0.85rem", fontWeight: "bold" }}
                        >
                          {item.main.temp.toFixed(1)}°C
                        </div>
                        <img
                          src={`http://openweathermap.org/img/wn/${item.weather[0].icon.replace(
                            "n",
                            "d"
                          )}@2x.png`}
                          alt="아이콘"
                          style={{ width: "40px", height: "40px" }}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>품질 현황</span>
                <span style={{ fontSize: "0.9rem", color: "#888" }}>
                  {currentDate}
                </span>
              </div>
            }
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={8}>
                <Card
                  style={{
                    position: "relative",
                    backgroundColor: "#ffffffff",
                    color: "black",
                    height: "230px",
                  }}
                >
                  <h2 style={{ fontWeight: "bold" }}>전체 품질율</h2>
                  <PieChart width={150} height={150}>
                    <Pie
                      data={[
                        { name: "Good", value: totalQualityRate },
                        { name: "error", value: 100 - totalQualityRate },
                      ]}
                      innerRadius={50}
                      outerRadius={70}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      nameKey="name"
                    >
                      <Cell key="good" fill="#ffffffff" />
                      <Cell key="error" fill="#8b2b1f" />
                    </Pie>
                  </PieChart>
                  <p
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "30px",
                      transform: "translateY(-50%)",
                      fontSize: "40px",
                      fontWeight: "bold",
                    }}
                  >
                    {totalQualityRate}%
                  </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  style={{
                    backgroundColor: "#ffffffff",
                    color: "black",
                    height: "230px",
                  }}
                >
                  <h2 style={{ fontWeight: "bold" }}>총 생산 수량</h2>
                  <p
                    style={{
                      position: "absolute",
                      left: "70px",
                      fontSize: "80px",
                    }}
                  >
                    {totalQty.toLocaleString()} EA
                  </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  style={{
                    backgroundColor: "#ffffffff",
                    color: "black",
                    height: "230px",
                  }}
                >
                  <h2 style={{ fontWeight: "bold" }}>성공 수량</h2>
                  <p
                    style={{
                      position: "absolute",
                      left: "70px",
                      fontSize: "80px",
                    }}
                  >
                    {totalSuccess.toLocaleString()} EA
                  </p>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {activeNotice && (
        <Modal
          title={activeNotice.title}
          visible={!!activeNotice}
          onCancel={() => setActiveNotice(null)}
          footer={null}
        >
          <ul>
            {activeNotice.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default MesHomePresenter;
