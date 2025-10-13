import QualityControlPresenter from "./QualityControlPresenter";
import { useEffect, useState } from "react";
import { MES_API } from "../../config";
import { MESapi } from "../../components/api/api";

const QualityControlContainer = () => {
  const [value, setValue] = useState("대기");
  const [qualityControls, setQualityControls] = useState([]);
  const [updateQualityControl, setUpdateQualityControl] = useState({
    successQuantity: 0,
    faultyQuantity: 0,
  });

  const fetchData = async () => {
    const resQc = await MESapi.get(`${MES_API}/quality_controls`);
    setQualityControls(resQc.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HandleChangeQuantity = (qcNo, name, value) => {
    setUpdateQualityControl((prev) => ({
      ...prev,
      qcNo: qcNo,
      [name]: value,
    }));
  };

  const HandleUpdateQualityControl = async (total, stockNo) => {
    if (
      total !==
      updateQualityControl.successQuantity + updateQualityControl.faultyQuantity
    )
      alert("수량을 확인해 주세요.");
    else {
      try {
        //1. 재고 추가
        await MESapi.put(`${MES_API}/stocks/${stockNo}`, {
          normalCount: updateQualityControl.successQuantity,
          errorCount: updateQualityControl.faultyQuantity,
        });

        //2. 품질 검사 상태 변경
        await MESapi.put(
          `${MES_API}/quality_controls/${updateQualityControl.qcNo}`,
          {
            successQuantity: updateQualityControl.successQuantity,
            faultQuantity: updateQualityControl.faultyQuantity,
          }
        );
        fetchData();
      } catch (err) {
        alert("수정 실패");
      }
    }
  };

  return (
    <QualityControlPresenter
      value={value}
      setValue={setValue}
      qualityControls={qualityControls}
      HandleChangeQuantity={HandleChangeQuantity}
      HandleUpdateQualityControl={HandleUpdateQualityControl}
    />
  );
};

export default QualityControlContainer;
