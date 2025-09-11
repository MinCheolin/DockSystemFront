import { Button, Table, Modal, Form, Input,Select} from 'antd';
import { SearchOutlined ,UnorderedListOutlined} from '@ant-design/icons';
import "./Client.css";


const ClientPresenter = ({clients,HandleChangeInput , HandleCreateClient,HandleCreateModalOpen,HandleModalClose,isModalOpen,HandleUpdateModalClose,handleSearchClient,
                        HandleUpdateClient,rowSelection, HandleRowClick, hasSelected,HandleDeleteClient, HandleDoubleClick,isUpdateModalOpen,setSearchTerm,handleShowAll,
                        updateClientInfo,HandleUpdateChangeInput,HandleChangeSelect, HandleUpdateChangeSelect,handleSearchChange, filteredClients,searchTerm,isSearching}) =>{
    
    const typeOptions = [
    { value: "자재", label: "자재" },
    { value: "장비", label: "장비" },
    ];
    
    // 필터 기능 구현(각각의 컬럼에 필터 함수 만들고 colums에 연결)
    const nameFilter = [...new Set(clients.map(client => client.clientName))].map(name =>({
        text:name,
        value:name
    }));

    const typeFilter = [...new Set(clients.map(client => client.type))].map(type =>({
        text:type,
        value:type
    }));

    const ceoFilter = [...new Set(clients.map(client => client.clientCeo))].map(ceo =>({
        text:ceo,
        value:ceo
    }));

    const managerFilter = [...new Set(clients.map(client =>client.clientManager))].map(manager =>({
        text:manager,
        value:manager
    }));

    const columns = [
        { title: '번호',key: 'index',render: (text, record, index) => index + 1, },
        { title: "거래처명", dataIndex: "clientName", key: "clientName", filters:nameFilter, onFilter: (value,record) => record.clientName === value},
        { title: "거래처 유형", dataIndex: "type", key: "type", filters:typeFilter, onFilter: (value,record) => record.type === value },
        { title: "사업자 등록 번호", dataIndex: "clientBrn", key: "clientBrn"}, 
        { title: "대표명", dataIndex: "clientCeo", key: "clientCeo", filters:ceoFilter, onFilter: (value,record) => record.clientCeo === value}, 
        { title: "담당자명", dataIndex: "clientManager", key: "clientManager", filters: managerFilter, onFilter: (value,record) => record.clientManager === value},
        { title: "연락처", dataIndex: "clientPhone", key: "clientPhone" },
    ];

    return(
        <>
            <div className="client-content">
                <div className="grid-func">
                    <div className="client-list">거래처 목록</div>
                    <div className="func-button">
                    <Button onClick={HandleCreateModalOpen}>추가</Button>
                    <Button type="primary" danger  disabled={!hasSelected} onClick={HandleDeleteClient}>삭제</Button>                
                    </div>
                </div>
                
                {/* 검색 칸, 검색(거래처명, 전체 보기) 버튼 */}
                <div className='client-search'> 
                    <Input
                        placeholder="거래처명 입력" 
                        value={searchTerm}          
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={handleSearchClient}>
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
                    dataSource={isSearching ? filteredClients : clients}  // 검색하려면 수정해야함
                    rowKey="clientNo" 
                    onRow={(record) => ({
                        onClick: () => HandleRowClick(record),
                        onDoubleClick: () => { HandleDoubleClick(record);
                        } 
                        })}
                    />     
            </div>
        
        <Modal
            title="거래처 추가"
            open={isModalOpen}
            footer={null}   
            onCancel={HandleModalClose} 
        >

        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={HandleCreateClient}>
            <Form.Item label="거래처명"><Input placeholder="거래처명을 입력하세요." name="clientName" onChange={HandleChangeInput} /></Form.Item>
            <Form.Item label="거래처 유형"><Select placeholder="거래처 유형을 선택하세요." name="type" options={typeOptions} onChange={(value) => HandleChangeSelect("type", value)} /></Form.Item>
            <Form.Item label="사업자 등록 번호"><Input placeholder="사업자 등록 번호를 입력하세요." name="clientBrn" onChange={HandleChangeInput} /></Form.Item>
            <Form.Item label="대표명"><Input placeholder="대표명을 입력하세요." name="clientCeo" onChange={HandleChangeInput} /></Form.Item>
            <Form.Item label="담당자명"><Input placeholder="담당자명을 입력하세요." name="clientManager" onChange={HandleChangeInput} /></Form.Item>
            <Form.Item label="연락처"><Input placeholder="연락처를 입력하세요." name="clientPhone" onChange={HandleChangeInput} /> </Form.Item>
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
            title="거래처 수정"
            open={isUpdateModalOpen}
            footer={null}   
            onCancel={HandleUpdateModalClose} 
        >

        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={HandleUpdateClient}>
        <Form.Item label="거래처명">   <Input placeholder="거래처명을 입력하세요." name="clientName"
        value={updateClientInfo.clientName}  // 상태 반영
        onChange={HandleUpdateChangeInput}
        //onChange={HandleChangeInput}
        /> </Form.Item>
        <Form.Item label="거래처 유형">
        <Select
            placeholder="거래처 유형을 선택하세요."
            name="type"
            value={updateClientInfo.type}
            options={typeOptions}
            onChange={(value) => HandleUpdateChangeSelect("type", value)}
        />
        </Form.Item>

        <Form.Item label="사업자 등록 번호">
        <Input
            placeholder="사업자 등록 번호를 입력하세요."
            name="clientBrn"
            value={updateClientInfo.clientBrn}
            onChange={HandleUpdateChangeInput}
            readOnly
        />
        </Form.Item>

        <Form.Item label="대표명">
        <Input
            placeholder="대표명을 입력하세요."
            name="clientCeo"
            value={updateClientInfo.clientCeo}
            onChange={HandleUpdateChangeInput}
        />
        </Form.Item>

        <Form.Item label="담당자명">
        <Input
            placeholder="담당자명을 입력하세요."
            name="clientManager"
            value={updateClientInfo.clientManager}
            onChange={HandleUpdateChangeInput}
        />
        </Form.Item>

        <Form.Item label="연락처">
        <Input
            placeholder="연락처를 입력하세요."
            name="clientPhone"
            value={updateClientInfo.clientPhone}
            onChange={HandleUpdateChangeInput}
        />
        </Form.Item>
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
    

export default ClientPresenter;


