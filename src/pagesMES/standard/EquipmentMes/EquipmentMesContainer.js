import EquipmentMesPresenter from "./EquipmentMesPresenter";
import { useState, useEffect } from "react";
import axios from "axios";
import { MES_API } from "../../../config";

const EquipmentMesContainer = () => {
  const [equipments, setEquipments] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${MES_API}/equipments`);
      setEquipments(response.data);
    } catch (err) {
      alert("조회 실패");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchEquipment = () => {
    const result = equipments.filter((equipment) =>
      equipment.equipName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEquipments(result);
    setIsSearching(true);
  };

  const handleShowAll = () => {
    setSearchTerm("");
    setFilteredEquipments([]);
    setIsSearching(false);
  };
  return (
    <EquipmentMesPresenter
      equipments={equipments}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filteredEquipments={filteredEquipments}
      isSearching={isSearching}
      handleSearchEquipment={handleSearchEquipment}
      handleShowAll={handleShowAll}
    />
  );
};
export default EquipmentMesContainer;
