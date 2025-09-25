import MaterialMesPresenter from "./MaterialMesPresenter";
import { useState, useEffect } from "react";
import axios from "axios";
import { MES_API } from "../../../config";

const MaterialMesContainer = () => {
  const [materials, setMaterials] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${MES_API}/materials`);
      setMaterials(response.data);
    } catch (err) {
      alert("조회 실패");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchMaterial = () => {
    const result = materials.filter((material) =>
      material.materialName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMaterials(result);
    setIsSearching(true);
  };

  const handleShowAll = () => {
    setSearchTerm("");
    setFilteredMaterials([]);
    setIsSearching(false);
  };
  return (
    <MaterialMesPresenter
      materials={materials}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filteredMaterials={filteredMaterials}
      isSearching={isSearching}
      handleSearchMaterial={handleSearchMaterial}
      handleShowAll={handleShowAll}
    />
  );
};
export default MaterialMesContainer;
