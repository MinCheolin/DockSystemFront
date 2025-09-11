import CustomerPresenter from "./CustomerPresenter";
import { useState,useEffect } from "react";
import axios from 'axios';

const CustomerContainer = () =>{
    const [customers, setCustomers] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateCustomerInfo, setUpdateCustomerInfo] = useState({
        customerNo: "",
        customerName: "",
        customerBrn:"",
        customerCeo: "",
        customerManager: "",
        customerPhone: ""
    }); 
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        customerName: "",
        customerBrn:"",
        customerCeo: "",
        customerManager: "",
        customerPhone: ""
    });

    // 검색 키워드 저장
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/erp/v1/customers');
        setCustomers(response.data);    
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
        if (selectedRowKeys.includes(record.customerNo)) {
        setSelectedRowKeys([]);      
        } else {
        setSelectedRowKeys([record.customerNo]); 
        }
    };

    const hasSelected = selectedRowKeys.length > 0;

    const HandleChangeInput= (e) => {
            const { name, value } = e.target;
            setCustomerInfo(prev => ({
            ...prev,
            [name]: value,
            }));
        };

    const HandleDoubleClick = (record) => {
        setSelectedRowKeys([record.customerNo]);
        setUpdateCustomerInfo({ 
            ...record,
            type: record.type
        })            
        setIsUpdateModalOpen(true);    
    };

    const HandleUpdateChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdateCustomerInfo(prev => ({
        ...prev,
        [name]: value
    }));
    };

    const HandleCreateCustomer = async () => {
        
        try {
            const response = await axios.post('http://localhost:8080/api/erp/v1/customers', customerInfo);
            
            } catch (error) {
            console.error('등록 실패:', error);
            }
        fetchData();
        setIsModalOpen(false);
    }

    const HandleDeleteCustomer = async () =>{
        if (selectedRowKeys.length === 0) return;  
        console.log(selectedRowKeys[0]);
        try {
            await axios.delete(`http://localhost:8080/api/erp/v1/customers/${selectedRowKeys[0]}`);
            setCustomers(prev => prev.filter(item => item.customerNo !== selectedRowKeys[0]));
            setSelectedRowKeys([]);
        } catch (err) {
            console.error(err);
            alert('삭제 실패');
        }
            fetchData();
    }

    const HandleUpdateCustomer = async () =>{
            const finalData = {
                ...updateCustomerInfo,
                customerNo: Number(updateCustomerInfo.customerNo),        
            };
        try {
            await axios.put(`http://localhost:8080/api/erp/v1/customers/${finalData.customerNo}`,finalData);
            } catch (err) {
            console.error(err);
            alert('수정 실패');
            }
            setIsUpdateModalOpen(false);
            fetchData();
    }

    // handleSearchCustomer, handleShowAll:  검색 기능
    const handleSearchCustomer = () => {
        const result = customers.filter(customer =>
            customer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCustomers(result);
        setIsSearching(true);
    };

    const handleShowAll = () => {
        setSearchTerm("");          
        setFilteredCustomers([]);     
        setIsSearching(false);
    };  
    const HandleCreateModalOpen = () => {
        setCustomerInfo({
            customerName: "",
            customerBrn:"",
            customerCeo: "",
            customerManager: "",
            customerPhone: ""
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
            <CustomerPresenter
                HandleChangeInput={HandleChangeInput} HandleCreateCustomer={HandleCreateCustomer} HandleUpdateCustomer ={HandleUpdateCustomer} filteredCustomers={filteredCustomers}
                updateCustomerInfo={updateCustomerInfo} HandleUpdateChangeInput ={HandleUpdateChangeInput} HandleDeleteCustomer = {HandleDeleteCustomer} setSearchTerm={setSearchTerm}
                setIsUpdateModalOpen={setIsUpdateModalOpen} customerInfo={customerInfo}
                HandleCreateModalOpen={HandleCreateModalOpen} HandleModalClose={HandleModalClose} isModalOpen={isModalOpen} searchTerm={searchTerm} isSearching={isSearching}
                customers={customers}  HandleUpdateModalClose={HandleUpdateModalClose} isUpdateModalOpen={isUpdateModalOpen} handleShowAll={handleShowAll}
                rowSelection={rowSelection} HandleRowClick={HandleRowClick} hasSelected={hasSelected} HandleDoubleClick={HandleDoubleClick} handleSearchCustomer={handleSearchCustomer}/>
                
                );  
}

export default CustomerContainer;