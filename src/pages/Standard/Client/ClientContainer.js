import ClientPresenter from "./ClientPresenter";
import { useState, useEffect } from "react";
import { ERP_API } from "../../../config";
import { ERPapi } from "../../../components/api/api";

const ClientContainer = () => {
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateClientInfo, setUpdateClientInfo] = useState({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [clientInfo, setClientInfo] = useState({});

  // 검색 키워드 저장
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async () => {
    try {
      const response = await ERPapi.get(`${ERP_API}/clients`);
      setClients(response.data);
    } catch (err) {
      alert(`조회 실패 : ${err}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const rowSelection = {
    selectedRowKeys,
    hideSelectAll: true,
    onChange: (selectedRowKeys) => {
      const lastKey = selectedRowKeys.pop();
      setSelectedRowKeys(lastKey ? [lastKey] : []);
    },
  };

  const HandleRowClick = (record) => {
    if (selectedRowKeys.includes(record.clientNo)) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys([record.clientNo]);
    }
  };

  const HandleChangeSelect = (name, value) => {
    setClientInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hasSelected = selectedRowKeys.length > 0;

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    setClientInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleDoubleClick = (record) => {
    setSelectedRowKeys([record.clientNo]);
    setUpdateClientInfo({
      ...record,
      type: record.type,
    });
    setIsUpdateModalOpen(true);
  };

  const HandleUpdateChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdateClientInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleUpdateChangeSelect = (name, value) => {
    setUpdateClientInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleCreateClient = async () => {
    try {
      await ERPapi.post(`${ERP_API}/clients`, clientInfo);
    } catch (err) {
      alert(err.response.data.message);
    }
    fetchData();
    setIsModalOpen(false);
  };

  const HandleDeleteClient = async () => {
    if (selectedRowKeys.length === 0) return;
    console.log(selectedRowKeys[0]);
    try {
      const res = await ERPapi.delete(
        `${ERP_API}/clients/${selectedRowKeys[0]}`
      );
      setSelectedRowKeys([]);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
    fetchData();
  };

  const HandleUpdateClient = async () => {
    const finalData = {
      ...updateClientInfo,
      clientNo: Number(updateClientInfo.clientNo),
    };
    try {
      const res = await ERPapi.put(
        `${ERP_API}/clients/${finalData.clientNo}`,
        finalData
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
    setIsUpdateModalOpen(false);
    fetchData();
  };

  // handleSearchClient, handleShowAll:  검색 기능
  const handleSearchClient = () => {
    const result = clients.filter((client) =>
      client.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(result);
    setIsSearching(true);
  };

  const handleShowAll = () => {
    setSearchTerm("");
    setFilteredClients([]);
    setIsSearching(false);
  };

  const HandleCreateModalOpen = () => {
    setClientInfo({
      clientName: "",
      type: "",
      clientBrn: "",
      clientCeo: "",
      clientManager: "",
      clientPhone: "",
    });
    setIsModalOpen(true);
  };

  const HandleModalClose = () => {
    setIsModalOpen(false);
  };

  const HandleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <ClientPresenter
      HandleChangeInput={HandleChangeInput}
      HandleCreateClient={HandleCreateClient}
      HandleUpdateClient={HandleUpdateClient}
      filteredClients={filteredClients}
      updateClientInfo={updateClientInfo}
      HandleUpdateChangeInput={HandleUpdateChangeInput}
      HandleDeleteClient={HandleDeleteClient}
      setSearchTerm={setSearchTerm}
      HandleChangeSelect={HandleChangeSelect}
      HandleUpdateChangeSelect={HandleUpdateChangeSelect}
      setIsUpdateModalOpen={setIsUpdateModalOpen}
      clientInfo={clientInfo}
      HandleCreateModalOpen={HandleCreateModalOpen}
      HandleModalClose={HandleModalClose}
      isModalOpen={isModalOpen}
      searchTerm={searchTerm}
      isSearching={isSearching}
      clients={clients}
      HandleUpdateModalClose={HandleUpdateModalClose}
      isUpdateModalOpen={isUpdateModalOpen}
      handleShowAll={handleShowAll}
      rowSelection={rowSelection}
      HandleRowClick={HandleRowClick}
      hasSelected={hasSelected}
      HandleDoubleClick={HandleDoubleClick}
      handleSearchClient={handleSearchClient}
    />
  );
};

export default ClientContainer;
