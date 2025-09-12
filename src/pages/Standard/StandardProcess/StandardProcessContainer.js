import StandardProcessPresenter from "./StandardProcessPresenter";
import {useState, useEffect} from "react";
import axios from 'axios';
import { _updateColumnState } from "ag-grid-community";

const StandardProcessContainer = () =>{
    const [standardprocesses, setStandardProcesses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateStandardProcessInfo, setUpdateStandardProcessInfo] = useState({
        spNo:"",
        spCode:"",
        spName:"",
        spTime:"",
        spDescription:""
    });

const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
const [selectedRowKeys, setSelectedRowKeys] = useState([]);
const [standardprocessInfo, setStandardProcessInfo] = useState({
      spCode:"",
      spName:"",
      spTime:"",
      spDescription:""
})

const [searchTerm, setSearchTerm] = useState("");
const [filteredStandardProcesses, setFilteredStandardProcesses] = useState([]);
const [isSearching, setIsSearching] = useState(false);


const fetchData = async () => {
    try{
        const response = await axios.get('http://localhost:8080/api/erp/v1/standardprocesses');
        setStandardProcesses(response.data);
    }catch (err){

    }finally{

    }
};


useEffect(()=>{
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
    if (selectedRowKeys.includes(record.spNo)) {
      setSelectedRowKeys([]);      
    } else {
      setSelectedRowKeys([record.spNo]); 
    }
  };

  const hasSelected = selectedRowKeys.length > 0;

  const HandleChangeInput= (e) => {
    const {name, value} = e.target;
    setStandardProcessInfo(prev => ({
        ...prev,
        [name]:value,
    }));
  };

  const HandleDoubleClick = (record) => {
    console.log("1.모달 열릴 때 데이터:", record)
    setSelectedRowKeys([record.spNo]);
    setUpdateStandardProcessInfo({
       ...record});
    setIsUpdateModalOpen(true);
  };

  const HandleUpdateChangeInput = (e) => {
    const {name, value} = e.target;
    setUpdateStandardProcessInfo(prev => ({
        ...prev,
        [name]: value
    }));
  };
  const handleCreateStandardProcess = async () => {
    try{
        const response = await axios.post('http://localhost:8080/api/erp/v1/standardprocesses', standardprocessInfo);
        console.log('등록성공:', response.data);
    } catch (error){
        console.error('등록 실패:', error);
    } 
    fetchData();
    setIsModalOpen(false);
  }
  const HandleDeleteStandardProcess = async () => {
    if (selectedRowKeys.length === 0) return;
    console.log(selectedRowKeys[0]);

    try{
        await axios.delete(`http://localhost:8080/api/erp/v1/standardprocesses/${selectedRowKeys[0]}`);
        setStandardProcesses(prev => prev.filter(item => item.spNo !== selectedRowKeys[0]));
        setSelectedRowKeys([]);
    }catch (err){
        console.error(err);
        alert('삭제 실패');
    }
    fetchData();
  }

  const HandleUpdateStandardProcess = async (values) =>{

      console.log("2. 폼 제출 시 데이터:", values); 
    const finalData = {
        ...updateStandardProcessInfo,
        ...values,
        spNo: Number(updateStandardProcessInfo.spNo),
    };
    try {
        await axios.put(`http://localhost:8080/api/erp/v1/standardprocesses/${finalData.spNo}`, finalData);
    }catch(err){
        console.error(err);
        alert('수정 실패');
    }

    setIsUpdateModalOpen(false);
    fetchData();
  }

  const handleSearchStandardProcess = () => {
    const result = standardprocesses.filter(standardprocess=>
      standardprocess.spName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStandardProcesses(result);
    setIsSearching(true);
  };

  const handleShowAll =() => {
      setSearchTerm("");          
      setFilteredStandardProcesses([]);     
      setIsSearching(false);
  };

  const HandleCreateModalOpen = () => {
    setStandardProcessInfo('');
    setIsModalOpen(true);
  };

  const HandleModalClose = () => {
    setIsModalOpen(false);
  };

  const HandleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };


  return (
    <StandardProcessPresenter HandleChangeInput={HandleChangeInput} 
    HandleCreateStandardProcess={handleCreateStandardProcess}
    HandleDeleteStandardProcess={HandleDeleteStandardProcess}
    setIsUpdateModalOpen={setIsUpdateModalOpen}
    updateStandardProcessInfo={updateStandardProcessInfo}
    HandleUpdateChangeInput = {HandleUpdateChangeInput}
    HandleUpdateStandardProcess = {HandleUpdateStandardProcess}
    HandleCreateModalOpen={HandleCreateModalOpen}
    HandleModalClose={HandleModalClose}
    isModalOpen = {isModalOpen}
    isUpdateModalOpen={isUpdateModalOpen}
    standardprocesses={standardprocesses}
    rowSelection={rowSelection}
    HandleRowClick={HandleRowClick}
    hasSelected={hasSelected}
    HandleDoubleClick={HandleDoubleClick}
    HandleUpdateModalClose={HandleUpdateModalClose}
    setSearchTerm={setSearchTerm}
    filteredStandardProcesses={filteredStandardProcesses}
    isSearching={isSearching}
    handleShowAll={handleShowAll}
    handleSearchStandardProcess={handleSearchStandardProcess}
    standardprocessInfo ={standardprocessInfo}
    />
  );
}

export default StandardProcessContainer;