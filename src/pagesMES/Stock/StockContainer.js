import StockPresenter from "./StockPresenter";
import { useState, useEffect } from "react";
import { MES_API } from "../../config";
import { MESapi } from "../../components/api/api";

const StockContainer = () => {
  const [stocks, setStocks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockInfo, setStockInfo] = useState({
    errorCount: 0,
    normalCount: 0,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // 검색 키워드 저장
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async () => {
    try {
      const response = await MESapi.get(`${MES_API}/stocks`);
      setStocks(response.data);
    } catch (err) {
      alert(`조회 실패 : ${err}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    setStockInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const rowSelection = {
    selectedRowKeys,
    hideSelectAll: true,
    onChange: (selectedRowKeys) => {
      const lastKey = selectedRowKeys.pop();
      setSelectedRowKeys(lastKey ? [lastKey] : []);
    },
  };
  const HandleModalStatusChange = () => {
    setStockInfo({
      stockName: "",
      errorCount: 0,
      normalCount: 0,
    });
    setIsModalOpen(!isModalOpen);
  };

  const HandleCreateStock = async () => {
    try {
      await MESapi.post(`${MES_API}/stocks`, stockInfo);
      fetchData();
      setIsModalOpen(false);
    } catch (err) {
      alert(`등록 실패 : ${err}`);
    }
  };

  const HandleDeleteStock = async () => {
    if (selectedRowKeys.length === 0) return;
    console.log(selectedRowKeys[0]);
    try {
      await MESapi.delete(`${MES_API}/clients/${selectedRowKeys[0]}`);
      setSelectedRowKeys([]);
    } catch (err) {
      alert(`삭제 실패 : ${err}`);
    }
    fetchData();
  };

  return (
    <StockPresenter
      stocks={stocks}
      isModalOpen={isModalOpen}
      HandleModalStatusChange={HandleModalStatusChange}
      HandleChangeInput={HandleChangeInput}
      HandleCreateStock={HandleCreateStock}
    />
  );
};

export default StockContainer;
