import { useEffect, useState } from "react";
import axios from "axios";
import { MES_API } from "../../config";
import MesHomePresenter from "./MesHomePresenter";

const MesHomeContainer = () => {
  const [weather, setWeather] = useState(null);
  const [quality, setQuality] = useState([]);
  const [totalQualityRate, setTotalQualityRate] = useState(0);
  const [totalSuccess, setTotalSuccess] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  const cityCoordinates = {
    busan: { name: "부산", lat: 35.1796, lon: 129.0756 },
    ulsan: { name: "울산", lat: 35.5384, lon: 129.3114 },
    geoje: { name: "거제", lat: 34.8806, lon: 128.6217 },
  };

  const [selectedCity, setSelectedCity] = useState("geoje");

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

  const fetchQuality = async () => {
    try {
      const res = await axios.get(`${MES_API}/quality_controls`);
      const dataWithRate = res.data.map((qc) => ({
        qc_no: qc.qcNo,
        wo_no: qc.workOrder.woNo,
        qualityRate: qc.totalQuantity
          ? ((qc.successQuantity / qc.totalQuantity) * 100).toFixed(1)
          : 0,
      }));
      setQuality(dataWithRate);

      const totalSuccess = res.data.reduce(
        (sum, qc) => sum + qc.successQuantity,
        0
      );
      const totalQty = res.data.reduce((sum, qc) => sum + qc.totalQuantity, 0);
      const avgRate = totalQty ? (totalSuccess / totalQty) * 100 : 0;

      setTotalSuccess(totalSuccess);
      setTotalQty(totalQty);
      setTotalQualityRate(avgRate.toFixed(1));
    } catch (err) {
      console.error("품질 정보 조회 실패", err);
    }
  };

  useEffect(() => {
    fetchWeather("geoje");
    fetchQuality();
  }, []);

  return (
    <MesHomePresenter
      weather={weather}
      cityCoordinates={cityCoordinates}
      selectedCity={selectedCity}
      onSelectCity={fetchWeather}
      quality={quality}
      totalSuccess={totalSuccess}
      totalQty={totalQty}
      totalQualityRate={totalQualityRate}
    />
  );
};

export default MesHomeContainer;
