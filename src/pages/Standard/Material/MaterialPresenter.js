import { Button, Table, Modal, Form, Input, Select } from 'antd';
import { SearchOutlined ,UnorderedListOutlined} from '@ant-design/icons';
import "./material.css";


const MaterialPresenter = ({materials,HandleChangeInput , HandleCreateMaterial,HandleCreateModalOpen,HandleModalClose,isModalOpen,HandleUpdateModalClose,handleSearchMaterial,
                          HandleUpdateMaterial,rowSelection, HandleRowClick, hasSelected,HandleDeleteMaterial, HandleDoubleClick,isUpdateModalOpen,setSearchTerm,handleShowAll,
                          updateMaterialInfo,HandleUpdateChangeInput,filteredMaterials,searchTerm,isSearching,materialInfo }) =>{
 
 const codeFilter = [...new Set(materials.map(material => material.materialCode))].map(code =>({
        text:code,
        value:code
    }));
 const nameFilter = [...new Set(materials.map(material => material.materialName))].map(name =>({
        text:name,
        value:name
    }));
 const typeFilter = [...new Set(materials.map(material => material.materialType))].map(type =>({
        text:type,
        value:type
    }));
 const sizeFilter = [...new Set(materials.map(material => material.materialSize))].map(size =>({
        text:size,
        value:size
    }));
 const priceFilter = [...new Set(materials.map(material => material.materialPrice))].map(price =>({
        text:price,
        value:price
    }));
 const unitFilter = [...new Set(materials.map(material => material.materialUnit))].map(unit =>({
        text:unit,
        value:unit
    }));
 
 const columns = [
   {
      title: '번호',
      key: 'index',
      render: (text, record, index) => index + 1, 
    },

  {
    title: '자재코드',
    dataIndex: 'materialCode',
    key: 'Code',
    filters:codeFilter, onFilter: (value,record) => record.materialCode === value
  },
  {
    title: '자재명',
    dataIndex: 'materialName',
    key: 'Name',
    filters:nameFilter, onFilter: (value,record) => record.materialName === value
  },
  {
    title: '자재유형',
    dataIndex: 'materialType',
    key: 'Type',
    filters:typeFilter, onFilter: (value,record) => record.materialType === value
  },
  {
    title: '자재규격',
    dataIndex: 'materialSize',
    key: 'Size',
    filters:sizeFilter, onFilter: (value,record) => record.materialSize === value
  },
  {
    title: '자재단가',
    dataIndex: 'materialPrice',
    key: 'Price',
    filters:priceFilter, onFilter: (value,record) => record.materialPrice === value
  },
  {
    title: '자재단위',
    dataIndex: 'materialUnit',
    key: 'Unit',
    filters:unitFilter, onFilter: (value,record) => record.materialUnit === value
  }
  ];

  return(
    <>
        <div className="material-content">
            <div className="grid-func">
                <div className="material-list">자재 목록</div>
                <div className="func-button">
                   <Button onClick={HandleCreateModalOpen}>추가</Button>
                   <Button type="primary" danger  disabled={!hasSelected} onClick={HandleDeleteMaterial}>삭제</Button>                
                </div>
            </div>
            <div className='material-search'> 
                    <Input
                        placeholder="자재명 입력" 
                        value={searchTerm}          
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={handleSearchMaterial}>
                    </Button>
                    <Button 
                        icon = {<UnorderedListOutlined />}
                        onClick={handleShowAll}>
                    </Button>
                </div>
            <div className="grid-box">
                  <Table size="small"
                   pagination={false}
                   rowClassName="clickable-row"
                   rowSelection={rowSelection}
                   columns={columns}
                   dataSource={isSearching ? filteredMaterials : materials} 
                   rowKey="materialNo" 
                   onRow={(record) => ({
                       onClick: () => HandleRowClick(record),
                       onDoubleClick: () => { HandleDoubleClick(record);
                       } 
                    })}
                   />     
        </div>
    
     <Modal
        title="자재 추가"
        open={isModalOpen}
        footer={null}   
        onCancel={HandleModalClose} 
      >

     <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={HandleCreateMaterial}>
      <Form.Item label="자재코드">   <Input placeholder="자재 코드를 입력하세요." name="materialCode"  value={materialInfo.materialCode}onChange={HandleChangeInput} /> </Form.Item>
      <Form.Item label="자재명">     <Input placeholder="자재 명을 입력하세요." name="materialName" value={materialInfo.materialName} onChange={HandleChangeInput} /> </Form.Item>
      <Form.Item label="자재유형">   <Input placeholder="자재 유형를 입력하세요." name="materialType" value={materialInfo.materialType} onChange={HandleChangeInput} /> </Form.Item>
      <Form.Item label="자재규격">   <Input placeholder="자재 규격을 입력하세요." name="materialSize" value={materialInfo.materialSize} onChange={HandleChangeInput} /> </Form.Item>
      <Form.Item label="자재단가">   <Input placeholder="자재 단가를 입력하세요." name="materialPrice" value={materialInfo.materialPrice} onChange={HandleChangeInput} /> </Form.Item>
      <Form.Item label="자재단위">   <Input placeholder="자재 단위를 입력하세요." name="materialUnit" value={materialInfo.materialUnit} onChange={HandleChangeInput} /> </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}> 
        <div className="modal-form-button">      <Button type="primary" htmlType="submit">
        추가
      </Button>
      <Button onClick={HandleModalClose}>
        닫기
      </Button>
      </div>
    </Form.Item>
     </Form>
      </Modal>

    <Modal
        title="선박 수정"
        open={isUpdateModalOpen}
        footer={null}   
        onCancel={HandleUpdateModalClose} 
      >

     <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={HandleUpdateMaterial}>
      <Form.Item label="자재코드">   <Input placeholder="자재 코드를 입력하세요." name="materialCode"
       value={updateMaterialInfo.materialCode}
      onChange={HandleUpdateChangeInput}
       /> </Form.Item>
       <Form.Item label="자재명">   <Input placeholder="자재 명을 입력하세요." name="materialName"
       value={updateMaterialInfo.materialName}
      onChange={HandleUpdateChangeInput}
       /> </Form.Item>
       <Form.Item label="자재유형">   <Input placeholder="자재 유형를 입력하세요." name="materialType"
       value={updateMaterialInfo.materialType}
      onChange={HandleUpdateChangeInput}
       /> </Form.Item>
       <Form.Item label="자재규격">   <Input placeholder="자재 규격을 입력하세요." name="materialSize"
       value={updateMaterialInfo.materialSize}
      onChange={HandleUpdateChangeInput}
       /> </Form.Item>
       <Form.Item label="자재단가">   <Input placeholder="자재 단가를 입력하세요." name="materialPrice"
       value={updateMaterialInfo.materialPrice}
      onChange={HandleUpdateChangeInput}
       /> </Form.Item>
       <Form.Item label="자재단위">   <Input placeholder="자재 단위를 입력하세요." name="materialUnit"
       value={updateMaterialInfo.materialUnit}
      onChange={HandleUpdateChangeInput}
       /> </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}> 
        <div className="modal-form-button">      <Button type="primary" htmlType="submit">
        수정
      </Button>
      <Button onClick={HandleUpdateModalClose}>
        닫기
      </Button>
      </div>
    </Form.Item>
     </Form>
      </Modal>
    




     </div>
        </>
    );
}
 

export default MaterialPresenter;


