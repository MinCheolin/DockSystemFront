import ClientPresenter from "./ClientPresenter"
import { useState,useEffect } from "react";
import axios from 'axios';

const ClientContainer = () =>{
    const [clients, setClients] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateClientInfo, setUpdateClientInfo] = useState({
        clientNo: "",
        clientName: "",
        type: null,
        clientBrn: "",
        clientCeo: "",
        clientManager: "",
        clientPhone: ""
    }); 
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [clientInfo, setClientInfo] = useState({
        clientName: "",
        type: null,
        clientBrn: "",
        clientCeo: "",
        clientManager: "",
        clientPhone: ""
    });

    // 검색 키워드 저장
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredClients, setFilteredClients] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/erp/v1/clients');
        setClients(response.data);    
      } catch (err) {
        
      } finally {
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

    const HandleChangeInput= (e) => {
            const { name, value } = e.target;
            setClientInfo(prev => ({
            ...prev,
            [name]: value,
            }));
        };

    const HandleDoubleClick = (record) => {
        setSelectedRowKeys([record.clientNo]);
        setUpdateClientInfo({ 
            ...record,
            type: record.type
        })            
        setIsUpdateModalOpen(true);    
    };

    const HandleUpdateChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdateClientInfo(prev => ({
        ...prev,
        [name]: value
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
            const response = await axios.post('http://localhost:8080/api/erp/v1/clients', clientInfo);

            } catch (error) {
            console.error('등록 실패:', error);
            }
        fetchData();
        setIsModalOpen(false);
    }

    const HandleDeleteClient = async () =>{
        if (selectedRowKeys.length === 0) return;  
        console.log(selectedRowKeys[0]);
        try {
            await axios.delete(`http://localhost:8080/api/erp/v1/clients/${selectedRowKeys[0]}`);
            setClients(prev => prev.filter(item => item.clientNo !== selectedRowKeys[0]));
            setSelectedRowKeys([]);
        } catch (err) {
            console.error(err);
            alert('삭제 실패');
        }
            fetchData();
    }

    const HandleUpdateClient = async () =>{
            const finalData = {
                ...updateClientInfo,
                clientNo: Number(updateClientInfo.clientNo),        
            };
        try {
            await axios.put(`http://localhost:8080/api/erp/v1/clients/${finalData.clientNo}`,finalData);
            } catch (err) {
            console.error(err);
            alert('수정 실패');
            }
            setIsUpdateModalOpen(false);
            fetchData();
    }

    // handleSearchClient, handleShowAll:  검색 기능
    const handleSearchClient = () => {
        const result = clients.filter(client =>
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
            clientPhone: ""
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
                HandleChangeInput={HandleChangeInput} HandleCreateClient={HandleCreateClient} HandleUpdateClient ={HandleUpdateClient} filteredClients={filteredClients}
                updateClientInfo={updateClientInfo} HandleUpdateChangeInput ={HandleUpdateChangeInput} HandleDeleteClient = {HandleDeleteClient} setSearchTerm={setSearchTerm}
                HandleChangeSelect={HandleChangeSelect} HandleUpdateChangeSelect={HandleUpdateChangeSelect} setIsUpdateModalOpen={setIsUpdateModalOpen} clientInfo={clientInfo}
                HandleCreateModalOpen={HandleCreateModalOpen} HandleModalClose={HandleModalClose} isModalOpen={isModalOpen} searchTerm={searchTerm} isSearching={isSearching}
                clients={clients}  HandleUpdateModalClose={HandleUpdateModalClose} isUpdateModalOpen={isUpdateModalOpen} handleShowAll={handleShowAll}
                rowSelection={rowSelection} HandleRowClick={HandleRowClick} hasSelected={hasSelected} HandleDoubleClick={HandleDoubleClick} handleSearchClient={handleSearchClient}/>
                
                );  
}

export default ClientContainer;