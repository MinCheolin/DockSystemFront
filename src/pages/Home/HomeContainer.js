import { useEffect, useState } from "react";
import HomePresenter from "./HomePresenter";
import axios from "axios";

const HomeContainer = () => {
  const [notices, setNotices] = useState([]);
  const [rateSummary, setRateSummary] = useState(null);
  const [oilPrices, setOilPrices] = useState(null);

  const [weather, setWeather] = useState(null);

  const cityCoordinates = {
    busan: { name: "부산", lat: 35.1796, lon: 129.0756 },
    ulsan: { name: "울산", lat: 35.5384, lon: 129.3114 },
    geoje: { name: "거제", lat: 34.8806, lon: 128.6217 },
  };

  const [selectedCity, setSelectedCity] = useState("geoje");

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
    fetchOilPrices();
  }, []);

  const fetchWeather = async (cityKey) => {
    const { lat, lon } = cityCoordinates[cityKey];
    try {
      const res = await axios.get("http://localhost:8080/api/weather", {
        params: { lat, lon },
      });
      setWeather(res.data);
      setSelectedCity(cityKey);
    } catch (err) {
      console.error("날씨 정보를 가져오는 데 실패했습니다:", err);
    }
  };

  useEffect(() => {
    fetchWeather("geoje");
  }, []);

  return (
    <HomePresenter
      dummyNotices={notices}
      rateSummary={rateSummary}
      oilPrices={oilPrices}
      weather={weather}
      cityCoordinates={cityCoordinates}
      selectedCity={selectedCity}
      onSelectCity={fetchWeather}
    />
  );
};

export default HomeContainer;
