import React, { useEffect } from 'react';
import { Button, Table, Modal, Form, Input, InputNumber, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "./bom.css";

const BOMPresenter = ({
    loading,
    boms,
    columns,
    rowSelection,
    hasSelected,
    isModalOpen,
    isDetailModalOpen,
    isEditing,
    form,
    selectedBOM,
    vessels,
    standardProcesses,
    materials,
    handleOpenCreateModal,
    handleModalClose,
    handleDetailModalClose,
    handleCreate,
    handleUpdate,
    handleDelete,
}) => {
    useEffect(() => {
        if (isDetailModalOpen && isEditing && selectedBOM) {
            form.setFieldsValue({
                bomDetails: selectedBOM.bomDetails?.map(e => ({
                    bomDetailNo: e.bomDetailNo,
                    materialNo: e.materialNo,
                    bomDetailCount: e.bomDetailCount,
                })) || [],
            });
        }
    }, [isDetailModalOpen, isEditing, selectedBOM, form]);

    return (
        <div className="bom-content" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h1>BOM 목록</h1>
                <div>
                    <Button type="primary" onClick={handleOpenCreateModal} style={{ marginRight: 8 }}>신규 등록</Button>
                    <Button type="primary" danger disabled={!hasSelected} onClick={handleDelete}>삭제</Button>
                </div>
            </div>
            
            <Table
                loading={loading}
                columns={columns}
                dataSource={boms}
                rowKey="bomNo"
                rowSelection={rowSelection}
                bordered
            />

            <Modal
                title="BOM 신규 등록"
                open={isModalOpen}
                onCancel={handleModalClose}
                footer={null}
                destroyOnClose // 모달 닫을 때 내부 데이터 파기 (폼 초기화를 위해)
            >
                <Form form={form} onFinish={handleCreate} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} autoComplete="off">
                    <Form.Item label="선박 선택" name="vesselNo" rules={[{ required: true, message: '선박 선택 필수' }]}>
                        <Select options={vessels} placeholder="선박 선택" />
                    </Form.Item>
                    <Form.Item label="표준 공정 선택" name="spNo" rules={[{ required: true, message: '공정 선택 필수' }]}>
                        <Select options={standardProcesses} placeholder="공정 선택" />
                    </Form.Item>
                    <p><b>BOM 상세 항목</b></p>
                    <Form.List name="bomDetailDtoList">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(field => (
                                    <Space key={field.key} align="baseline">
                                        <Form.Item {...field} name={[field.name, 'materialNo']} rules={[{ required: true, message: '자재를 선택하세요.' }]}>
                                            <Select options={materials} placeholder="자재" style={{ width: 250 }} />
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'bomDetailCount']} rules={[{ required: true, message: '수량을 입력하세요.' }]}>
                                            <InputNumber placeholder="수량" style={{ width: 100 }} />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>자재 추가</Button>
                            </>
                        )}
                    </Form.List>
                    <Form.Item wrapperCol={{ offset: 6, span: 18 }} style={{ marginTop: 24 }}>
                        <Button type="primary" htmlType="submit">등록</Button>
                        <Button style={{ marginLeft: 8 }} onClick={handleModalClose}>취소</Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={<div className="modal-title">{isEditing ? `BOM 수정 - ${selectedBOM?.bomNo}` : `BOM 상세 - ${selectedBOM?.bomNo}`}</div>}
                open={isDetailModalOpen}
                onCancel={handleDetailModalClose}
                footer={null}
                destroyOnClose
            >
                {isEditing ? (
                    <Form form={form} onFinish={handleUpdate} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                         <Form.Item label="선박"><b>{selectedBOM?.vesselName}</b></Form.Item>
                         <Form.Item label="공정"><b>{selectedBOM?.spName}</b></Form.Item>
                         <p><b>BOM 상세 항목</b></p>
                         <Form.List name="bomDetails">
                             {(fields, { add, remove }) => (
                                 <>
                                     {fields.map(field => (
                                         <Space key={field.key} align="baseline">
                                            <Form.Item hidden {...field} name={[field.name, 'bomDetailNo']}><Input /></Form.Item>
                                            <Form.Item {...field} name={[field.name, 'materialNo']} rules={[{ required: true }]}>
                                                <Select options={materials} style={{ width: 250 }} />
                                            </Form.Item>
                                            <Form.Item {...field} name={[field.name, 'bomDetailCount']} rules={[{ required: true }]}>
                                                <InputNumber style={{ width: 100 }} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                         </Space>
                                     ))}
                                     <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>자재 추가</Button>
                                 </>
                             )}
                         </Form.List>
                         <Form.Item wrapperCol={{ offset: 6, span: 18 }} style={{ marginTop: 24 }}>
                            <Button type="primary" htmlType="submit">수정 저장</Button>
                            <Button style={{ marginLeft: 8 }} onClick={handleDetailModalClose}>취소</Button>
                        </Form.Item>
                    </Form>
                ) : (
                    selectedBOM && (
                        <div>
                            <div className ="modal-info-box">
                            <p><b>선박  :   </b> {selectedBOM.vesselName}</p>
                            <p><b>공정  :   </b> {selectedBOM.spName}</p>
                            </div>
                            <Table
                                columns={[
                                    { title: '자재', dataIndex: 'materialName' },
                                    { title: '수량', dataIndex: 'bomDetailCount', sorter: (a, b) => a.bomDetailCount - b.bomDetailCount,
 },
                                ]}
                                dataSource={selectedBOM.bomDetails}
                                rowKey="materialNo"
                                pagination={false}
                                size="small"
                            />
                        </div>
                    )
                )}
            </Modal>
        </div>
    );
};

export default BOMPresenter;