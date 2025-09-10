import { useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Client = ()=>{
    const [rowData,setRowData] = useState([
    {
        '거래처명': '삼성전자',
        '거래처 유형': '대기업',
        '사업자 등록 번호': '123-45-67890',
        '대표명': '홍길동',
        '담당자명': '김철수',
        '연락처': '010-1234-5678',
        '주소': '서울특별시 강남구 테헤란로 123',
        '현재 거래 여부': 'Y',
    },
    {
        '거래처명': 'LG화학',
        '거래처 유형': '대기업',
        '사업자 등록 번호': '987-65-43210',
        '대표명': '이영희',
        '담당자명': '박민수',
        '연락처': '010-8765-4321',
        '주소': '서울특별시 영등포구 여의도동 456',
        '현재 거래 여부': 'Y',
    },
    {
        '거래처명': '중소기업 A',
        '거래처 유형': '중소기업',
        '사업자 등록 번호': '111-22-33333',
        '대표명': '김영수',
        '담당자명': '최지현',
        '연락처': '010-1111-2222',
        '주소': '부산광역시 해운대구 센텀로 789',
        '현재 거래 여부': 'N',
    },
    {
        '거래처명': '중소기업 B',
        '거래처 유형': '중소기업',
        '사업자 등록 번호': '444-55-66666',
        '대표명': '박영희',
        '담당자명': '정호준',
        '연락처': '010-3333-4444',
        '주소': '대구광역시 수성구 동대구로 101',
        '현재 거래 여부': 'Y',
    },
    ]);

    const [newClient, setNewClient] = useState({
        거래처명: '',
        '거래처 유형': '',
        '사업자 등록 번호': '',
        대표명: '',
        담당자명: '',
        연락처: '',
        주소: '',
        '현재 거래 여부': ''
        });

    const [columnDefs] = useState([
        { field: '거래처명', sortable: true, filter: true },
        { field: '거래처 유형', sortable: true, filter: true },
        { field: '사업자 등록 번호', sortable: true, filter: true },
        { field: '대표명', sortable: true, filter: true },
        { field: '담당자명', sortable: true, filter: true },
        { field: '연락처', sortable: true, filter: true },
        { field: '주소', sortable: true, filter: true },
        { field: '현재 거래 여부', sortable: true, filter: true }
    ]);

    const [searchData, setSearchData] = useState('');
    const [filterData,setFilterData] = useState(rowData);

    const handleSearch = ()=>{
        const filtered = rowData.filter(client => client.거래처명.toLowerCase().includes(searchData.toLowerCase()));
        setFilterData(filtered);
    };

    return(
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            
            <h1>거래처 등록</h1>
            <div style={{ marginBottom: 16 }}>
                <input placeholder="거래처명" value={newClient.거래처명} onChange={e => setNewClient({ ...newClient, 거래처명: e.target.value })} />
                <input placeholder="거래처 유형" value={newClient['거래처 유형']} onChange={e => setNewClient({ ...newClient, '거래처 유형': e.target.value })} />
                <input placeholder="사업자 등록 번호" value={newClient['사업자 등록 번호']} onChange={e => setNewClient({ ...newClient, '사업자 등록 번호': e.target.value })} />
                <input placeholder="대표명" value={newClient['대표명']} onChange={e => setNewClient({ ...newClient, '대표명': e.target.value })} />
                <input placeholder="담당자명" value={newClient['담당자명']} onChange={e => setNewClient({ ...newClient, '담당자명': e.target.value })} />
                <input placeholder="연락처" value={newClient['연락처']} onChange={e => setNewClient({ ...newClient, '연락처': e.target.value })} />
                <input placeholder="주소" value={newClient['주소']} onChange={e => setNewClient({ ...newClient, '주소': e.target.value })} />
                <input placeholder="현재 거래 여부" value={newClient['현재 거래 여부']} onChange={e => setNewClient({ ...newClient, '현재 거래 여부': e.target.value })} />
                
                <button
                    onClick={() => {
                        const updatedData = [...rowData, newClient];
                        setRowData(updatedData);
                        setFilterData(updatedData);
                        setNewClient({ 거래처명: '', '거래처 유형': '', '사업자 등록 번호': '', 대표명: '', 담당자명: '', 연락처: '', 주소: '', '현재 거래 여부': 'Y' });
                    }}
                    >
                    등록
                </button>
            </div>

            <h1>거래처 검색</h1>        
            <div style={{ marginBottom: 16 }}>
                <input
                    placeholder="거래처명 검색"
                    value={searchData}
                    onChange={e => setSearchData(e.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
                <button onClick={() => { setFilterData(rowData); setSearchData(''); }}>전체보기</button>
            </div>        

            <h1>거래처 목록</h1>        
            <AgGridReact 
                rowData={filterData}
                columnDefs={columnDefs}
                defaultColDef={{ flex: 1, minWidth: 100 }}
                pagination={true}
                theme="legacy"
            />
        </div>
    )
}
export default Client;