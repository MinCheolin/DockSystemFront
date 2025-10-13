import { useEffect, useState } from "react";
import HomePresenter from "./HomePresenter";
import axios from "axios";

const HomeContainer = () => {
  const [notices, setNotices] = useState([]);
  const [rateSummary, setRateSummary] = useState(null);
  const [oilPrices, setOilPrices] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/erp/v1/news");
        const newsData = res.data.map((item, idx) => ({
          id: idx,
          title: item.title,
          link: item.link,
        }));
        setNotices(newsData);
      } catch (err) {
        console.error("뉴스 데이터를 가져오는 데 실패했습니다:", err);
      }
    };

    const fetchRateSummary = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/exchange-rate/summary"
        );
        const summaryData = res.data;

        if (summaryData && summaryData.historicalData) {
          summaryData.historicalData = summaryData.historicalData.map(
            (item) => ({
              ...item,
              rate: parseFloat(item.rate),
            })
          );
        }

        // 데이터를 모두 가공한 후, 마지막에 한번만 state를 업데이트합니다.
        setRateSummary(summaryData);
      } catch (err) {
        console.error("환율 통계 정보를 가져오는 데 실패했습니다:", err);
      }
    };

    const fetchOilPrices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/oil-price/latest-all"
        );
        setOilPrices(res.data);
      } catch (err) {
        console.error("국제 유가 정보를 가져오는 데 실패했습니다:", err);
      }
    };

    fetchNews();
    fetchRateSummary();
    fetchOilPrices(); // 함수 호출
  }, []);

  // Presenter에 oilSummary prop 전달
  return (
    <HomePresenter
      dummyNotices={notices}
      rateSummary={rateSummary}
      oilPrices={oilPrices}
    />
  );
};

export default HomeContainer;
