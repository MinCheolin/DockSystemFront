import { Button, Table, Modal, Form, Input} from 'antd';
import "./vessel.css";


const VesselPresenter = ({vessels,HandleChangeInput , HandleCreateVessel,HandleCreateModalOpen,HandleModalClose,isModalOpen,HandleUpdateModalClose,
                          HandleUpdateVessel,rowSelection, HandleRowClick, hasSelected,HandleDeleteVessel, HandleDoubleClick,isUpdateModalOpen,updateVesselInfo,HandleUpdateChangeInput }) =>{
 const columns = [
   {
      title: '번호',
      key: 'index',
      render: (text, record, index) => index + 1, 
    },

  {
    title: '선박명',
    dataIndex: 'vesselName',
    key: 'name',
  },
  {
    title: '선박종류',
    dataIndex: 'vesselType',
    key: 'Type',
  },
  {
    title: '선박크기',
    dataIndex: 'vesselSize',
    key: 'Size',
  }
  ];

  return(
    <>
        <div className="vessel-content">
            <div className="grid-func">
                <div className="vessel-list">선박 목록</div>
                <div className="func-button">
                   <Button onClick={HandleCreateModalOpen}>추가</Button>
                   <Button type="primary" danger  disabled={!hasSelected} onClick={HandleDeleteVessel}>삭제</Button>                
                </div>
            </div>
            <div className="grid-box">
                  <Table size="small"
                   pagination={false}
                   rowClassName="clickable-row"
                   rowSelection={rowSelection}
                   columns={columns} dataSource={vessels} 
                   rowKey="vesselNo" 
                   onRow={(record) => ({
                       onClick: () => HandleRowClick(record),
                       onDoubleClick: () => { HandleDoubleClick(record);
                       } 
                    })}
                   />     
        </div>
    
     <Modal
        title="선박 추가"
        open={isModalOpen}
        footer={null}   
        onCancel={HandleModalClose} 
      >

     <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={HandleCreateVessel}>
      <Form.Item label="선박명">   <Input placeholder="선박명을 입력하세요." name="vesselName" onChange={HandleChangeInput} /> </Form.Item>
      <Form.Item label="선박종류">   <Input placeholder="선박 종류를 입력하세요." name="vesselType" onChange={HandleChangeInput} /> </Form.Item>
      <Form.Item label="선박크기">   <Input placeholder="선박 크기를 입력하세요." name="vesselSize" onChange={HandleChangeInput} /> </Form.Item>
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

     <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={HandleUpdateVessel}>
      <Form.Item label="선박명">   <Input placeholder="선박명을 입력하세요." name="vesselName"
       value={updateVesselInfo.vesselName}  // 상태 반영
      onChange={HandleUpdateChangeInput}
      //onChange={HandleChangeInput}
       /> </Form.Item>
       <Form.Item label="선박종류">   <Input placeholder="선박 종류를 입력하세요." name="vesselType"
       value={updateVesselInfo.vesselType}  // 상태 반영
      onChange={HandleUpdateChangeInput}
      //onChange={HandleChangeInput}
       /> </Form.Item>
       <Form.Item label="선박크기">   <Input placeholder="선박 크기를 입력하세요." name="vesselSize"
       value={updateVesselInfo.vesselSize}  // 상태 반영
      onChange={HandleUpdateChangeInput}
      //onChange={HandleChangeInput}
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
 

export default VesselPresenter;


