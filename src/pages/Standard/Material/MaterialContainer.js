import MaterialPresenter from "./MaterialPresenter";
import { useState,useEffect } from "react";
import axios from 'axios';

const MaterialContainer = () =>{
  const [materials, setMaterials] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateMaterialInfo,setUpdateMaterialInfo] = useState({
    materialNo:"",
    materialCode:'',
    materialName:"",
    materialType:"",
    materialSize:"",
    materialPrice:"",
    materialUnit:""
    });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [materialInfo, setMaterialInfo] = useState({
        materialNo:"",
        materialCode:'',
        materialName:"",
        materialType:"",
        materialSize:"",
        materialPrice:"",
        materialUnit:""
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMaterials, setFilteredMaterials] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/erp/v1/materials');
        setMaterials(response.data);    
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
    if (selectedRowKeys.includes(record.materialNo)) {
      setSelectedRowKeys([]);      
    } else {
      setSelectedRowKeys([record.materialNo]); 
    }
  };



  const hasSelected = selectedRowKeys.length > 0;

  const HandleChangeInput= (e) => {
        const { name, value } = e.target;
        setMaterialInfo(prev => ({
        ...prev,
        [name]: value,
        }));
    };

 const HandleDoubleClick = (record) => {
    setSelectedRowKeys([record.materialNo]);
    setUpdateMaterialInfo({ ...record });             
    setIsUpdateModalOpen(true);    
  };

const HandleUpdateChangeInput = (e) => {
  const { name, value } = e.target;
  setUpdateMaterialInfo(prev => ({
    ...prev,
    [name]: value
  }));
};



  const HandleCreateMaterial = async () => {
       try {
          const response = await axios.post('http://localhost:8080/api/erp/v1/materials', materialInfo);
          console.log('등록 성공:', response.data);
        } catch (error) {
        console.error('등록 실패:', error);
        }
    setIsModalOpen(false);
  }
  const HandleDeleteMaterial = async () =>{
    if (selectedRowKeys.length === 0) return;  
    console.log(selectedRowKeys[0]);
   try {
    await axios.delete(`http://localhost:8080/api/erp/v1/materials/${selectedRowKeys[0]}`);
    setMaterials(prev => prev.filter(item => item.materialNo !== selectedRowKeys[0]));
    setSelectedRowKeys([]);
  } catch (err) {
    console.error(err);
    alert('삭제 실패');
  }
       fetchData();
  }

  const HandleUpdateMaterial = async () =>{
        const finalData = {
            ...updateMaterialInfo,
            materialNo: Number(updateMaterialInfo.materialNo),        
        };
       try {
          await axios.put(`http://localhost:8080/api/erp/v1/materials/${finalData.materialNo}`,finalData);
        } catch (err) {
           console.error(err);
           alert('수정 실패');
        }
        setIsUpdateModalOpen(false);
         fetchData();
  }

  const handleSearchMaterial = () => {
        const result = materials.filter(material =>
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

  const HandleCreateModalOpen = () => {
    setMaterialInfo('');
    setIsModalOpen(true);
  };

  const HandleModalClose = () => {
    setIsModalOpen(false);
  };

    const HandleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  return (
        <MaterialPresenter HandleChangeInput={HandleChangeInput} HandleCreateMaterial={HandleCreateMaterial} HandleDeleteMaterial={HandleDeleteMaterial} setIsUpdateModalOpen={setIsUpdateModalOpen}
            updateMaterialInfo={updateMaterialInfo}       HandleUpdateChangeInput ={HandleUpdateChangeInput} HandleUpdateMaterial={HandleUpdateMaterial} handleShowAll={handleShowAll}
        HandleCreateModalOpen={HandleCreateModalOpen} HandleModalClose={HandleModalClose} isModalOpen={isModalOpen} isUpdateModalOpen={isUpdateModalOpen}materials={materials}
                rowSelection={rowSelection} HandleRowClick={HandleRowClick} hasSelected={hasSelected} HandleDoubleClick={HandleDoubleClick} HandleUpdateModalClose={HandleUpdateModalClose}
                filteredMaterials={filteredMaterials} isSearching={isSearching} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearchMaterial={handleSearchMaterial}/>
               
              );  
}

export default MaterialContainer;