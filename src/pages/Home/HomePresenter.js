import { Row, Col, Card, List, Typography, Spin, Statistic, Tabs } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "./home.css";

const { Text } = Typography;

const HomePresenter = ({
  dummyNotices = [],
  rateSummary,
  oilPrices,
  weather,
  cityCoordinates,
  selectedCity,
  onSelectCity,
}) => {
  let ratePositionPercent = 0;
  if (rateSummary && !rateSummary.error) {
    const { currentRate, weeklyHigh, weeklyLow } = rateSummary;
    const range = weeklyHigh - weeklyLow;
    if (range > 0) {
      ratePositionPercent = ((currentRate - weeklyLow) / range) * 100;
    } else {
      ratePositionPercent = 50;
    }
  }

  return (
    <div className="home-content">
      <div className="top-area">
        <div className="article-area">
          <Card title="조선소 최신 뉴스">
            <List
              dataSource={dummyNotices}
              renderItem={(item) => (
                <List.Item>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </List.Item>
              )}
            />
          </Card>
        </div>
        <div className="weather-container" style={{ width: "600px" }}>
          <div className="city-buttons">
            {Object.entries(cityCoordinates).map(([key, { name }]) => (
              <button
                key={key}
                onClick={() => onSelectCity(key)}
                style={{
                  margin: "4px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background: selectedCity === key ? "#1677ff" : "#eef3faff",
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
                  .filter((_, idx) => idx % 8 === 0) // 하루 1개
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
                      <div style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
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
      </div>

      <div className="business-index">
        <Card
          title="주요 경제 지표"
          extra={
            <Text type="secondary" style={{ fontSize: "12px" }}>
              출처: OilPriceAPI, 한국수출입은행
            </Text>
          }
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="달러/원 환율" key="1">
              <div
                style={{
                  height: "400px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {rateSummary && !rateSummary.error ? (
                  <>
                    <div style={{ textAlign: "center" }}>
                      <Statistic
                        title="현재 환율"
                        value={rateSummary.currentRate}
                        precision={2}
                        suffix="원"
                        valueStyle={{ fontSize: "2.5rem" }}
                      />
                      <Statistic
                        value={Math.abs(rateSummary.change)}
                        precision={2}
                        valueStyle={{
                          fontSize: "1rem",
                          color:
                            rateSummary.change >= 0 ? "#cf1322" : "#3f8600",
                        }}
                        prefix={
                          rateSummary.change >= 0 ? (
                            <ArrowUpOutlined />
                          ) : (
                            <ArrowDownOutlined />
                          )
                        }
                      />
                    </div>
                    <ResponsiveContainer width="100%" height={120}>
                      <LineChart
                        data={rateSummary.historicalData}
                        margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          fontSize={10}
                          tick={{ fill: "#666" }}
                        />
                        <YAxis
                          domain={["dataMin - 10", "dataMax + 10"]}
                          fontSize={10}
                          tick={{ fill: "#666" }}
                        />
                        <Tooltip
                          formatter={(value) => `${value.toLocaleString()}원`}
                        />
                        <Line
                          type="monotone"
                          dataKey="rate"
                          stroke="#8884d8"
                          strokeWidth={2}
                          dot={true}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                        }}
                      >
                        <Text type="secondary">최근 7일 최저</Text>
                        <Text type="secondary">최근 7일 최고</Text>
                      </div>
                      <div
                        style={{
                          position: "relative",
                          height: "10px",
                          background: "#f0f0f0",
                          borderRadius: "5px",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: `${ratePositionPercent}%`,
                            top: "-2.5px",
                            width: "15px",
                            height: "15px",
                            background: "#1677ff",
                            borderRadius: "50%",
                            transform: "translateX(-50%)",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "8px",
                        }}
                      >
                        <Text strong>
                          {rateSummary.weeklyLow.toLocaleString()} 원
                        </Text>
                        <Text strong>
                          {rateSummary.weeklyHigh.toLocaleString()} 원
                        </Text>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Spin size="large" />
                  </div>
                )}
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab="국제 유가" key="2">
              <div style={{ padding: "24px" }}>
                {oilPrices ? (
                  <Row gutter={[16, 32]}>
                    <Col xs={24} md={12}>
                      <Statistic
                        title="WTI (서부 텍사스산 원유)"
                        value={oilPrices.wti.price}
                        precision={2}
                        prefix="$"
                        valueStyle={{ color: "#3f8600" }}
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <Statistic
                        title="브렌트유 (Brent)"
                        value={oilPrices.brent.price}
                        precision={2}
                        prefix="$"
                        valueStyle={{ color: "#3f8600" }}
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <Statistic
                        title="두바이유 (Dubai)"
                        value={oilPrices.dubai.price}
                        precision={2}
                        prefix="$"
                        valueStyle={{ color: "#3f8600" }}
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <Statistic
                        title="타피스유 (Tapis)"
                        value={oilPrices.tapis.price}
                        precision={2}
                        prefix="$"
                        valueStyle={{ color: "#3f8600" }}
                      />
                    </Col>
                  </Row>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                  >
                    <Spin size="large" />
                  </div>
                )}
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default HomePresenter;
