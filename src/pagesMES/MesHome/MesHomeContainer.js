import { useEffect, useState } from "react";
import axios from "axios";
import { MES_API } from "../../config";
import MesHomePresenter from "./MesHomePresenter";

const MesHomeContainer = () => {
  const [weather, setWeather] = useState(null);
  const [quality, setQuality] = useState([]);

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
      setQuality(res.data);
    } catch (err) {
      console.error("품질 정보 조회 실패");
    }
  };

  useEffect(() => {
    fetchWeather("geoje");
    fetchQuality();
  }, []);

  const HandleCalculateQuality = () => {};
  return (
    <MesHomePresenter
      weather={weather}
      cityCoordinates={cityCoordinates}
      selectedCity={selectedCity}
      onSelectCity={fetchWeather}
    />
  );
};

export default MesHomeContainer;
