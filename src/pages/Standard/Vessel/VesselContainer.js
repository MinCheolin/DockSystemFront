import VesselPresenter from "./VesselPresenter";
import { useState,useEffect } from "react";
import axios from 'axios';

const VesselContainer = () =>{
  const [vessels, setVessels] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateVesselInfo,setUpdateVesselInfo] = useState({
    vesselNo:"",    
    vesselName:"",
    vesselType:"",
    vesselSize:""
    });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [vesselInfo, setVesselInfo] = useState({
        vesselName:"",
        vesselType:"",
        vesselSize:""
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredVessels, setFilteredVessels] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/erp/v1/vessels');
        setVessels(response.data);    
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
    if (selectedRowKeys.includes(record.vesselNo)) {
      setSelectedRowKeys([]);      
    } else {
      setSelectedRowKeys([record.vesselNo]); 
    }
  };



  const hasSelected = selectedRowKeys.length > 0;

  const HandleChangeInput= (e) => {
        const { name, value } = e.target;
        setVesselInfo(prev => ({
        ...prev,
        [name]: value,
        }));
    };

 const HandleDoubleClick = (record) => {
    setSelectedRowKeys([record.vesselNo]);
    setUpdateVesselInfo({ ...record });
    setIsUpdateModalOpen(true);    
  };

const HandleUpdateChangeInput = (e) => {
  const { name, value } = e.target;
  setUpdateVesselInfo(prev => ({
    ...prev,
    [name]: value
  }));
};



  const HandleCreateVessel = async () => {
       try {
          const response = await axios.post('http://localhost:8080/api/erp/v1/vessels', vesselInfo);
          console.log('등록 성공:', response.data);
        } catch (error) {
        console.error('등록 실패:', error);
        }
    setIsModalOpen(false);
  }
  const HandleDeleteVessel = async () =>{
    if (selectedRowKeys.length === 0) return;  
    console.log(selectedRowKeys[0]);
   try {
    await axios.delete(`http://localhost:8080/api/erp/v1/vessels/${selectedRowKeys[0]}`);
    setVessels(prev => prev.filter(item => item.vesselNo !== selectedRowKeys[0]));
    setSelectedRowKeys([]);
  } catch (err) {
    console.error(err);
    alert('삭제 실패');
  }
       fetchData();
  }

  const HandleUpdateVessel = async () =>{
        const finalData = {
            ...updateVesselInfo,
            vesselNo: Number(updateVesselInfo.vesselNo),        
        };
       try {
          await axios.put(`http://localhost:8080/api/erp/v1/vessels/${finalData.vesselNo}`,finalData);
        } catch (err) {
           console.error(err);
           alert('수정 실패');
        }
        setIsUpdateModalOpen(false);
         fetchData();
  }

  const handleSearchVessel = () => {
        const result = vessels.filter(vessel =>
            vessel.vesselName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVessels(result);
        setIsSearching(true);
    };

    const handleShowAll = () => {
        setSearchTerm("");          
        setFilteredVessels([]);     
        setIsSearching(false);
    };

  const HandleCreateModalOpen = () => {
    setVesselInfo('');
    setIsModalOpen(true);
  };

  const HandleModalClose = () => {
    setIsModalOpen(false);
  };

    const HandleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  return (
        <VesselPresenter HandleChangeInput={HandleChangeInput} HandleCreateVessel={HandleCreateVessel} HandleDeleteVessel={HandleDeleteVessel} setIsUpdateModalOpen={setIsUpdateModalOpen}
            updateVesselInfo={updateVesselInfo}       HandleUpdateChangeInput ={HandleUpdateChangeInput} HandleUpdateVessel={HandleUpdateVessel}
        HandleCreateModalOpen={HandleCreateModalOpen} HandleModalClose={HandleModalClose} isModalOpen={isModalOpen} isUpdateModalOpen={isUpdateModalOpen}vessels={vessels}
                rowSelection={rowSelection} HandleRowClick={HandleRowClick} hasSelected={hasSelected} HandleDoubleClick={HandleDoubleClick} HandleUpdateModalClose={HandleUpdateModalClose}
                filteredVessels={filteredVessels} isSearching={isSearching} handleSearchVessel={handleSearchVessel} handleShowAll={handleShowAll} setSearchTerm={setSearchTerm}
                searchTerm={searchTerm} />
               
              );  
}

export default VesselContainer;