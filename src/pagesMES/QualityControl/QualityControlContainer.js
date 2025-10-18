import QualityControlPresenter from "./QualityControlPresenter";
import { useEffect, useState } from "react";
import { MES_API } from "../../config";
import { MESapi } from "../../components/api/api";

const QualityControlContainer = () => {
  const [value, setValue] = useState("대기");
  const [qualityControls, setQualityControls] = useState([]);

  const fetchData = async () => {
    const resQc = await MESapi.get(`${MES_API}/quality_controls`);
    setQualityControls(resQc.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HandleChangeQuantity = (updateQcNo, name, value) => {
    const filteredQC = qualityControls.find((qc) => qc.qcNo === updateQcNo);
    if (value > filteredQC.totalQuantity) {
      value = filteredQC.totalQuantity;
    }

    if (name === "successQuantity") {
      setQualityControls((prev) =>
        prev.map((qc) =>
          qc.qcNo === updateQcNo
            ? {
                ...qc,
                [name]: value,
                faultQuantity: filteredQC.totalQuantity - value,
              }
            : qc
        )
      );
    } else {
      setQualityControls((prev) =>
        prev.map((qc) =>
          qc.qcNo === updateQcNo
            ? {
                ...qc,
                [name]: value,
                successQuantity: filteredQC.totalQuantity - value,
              }
            : qc
        )
      );
    }
  };

  const HandleUpdateQualityControl = async (updateQcNo) => {
    const filteredQC = qualityControls.find((qc) => qc.qcNo === updateQcNo);

    if (
      filteredQC.totalQuantity !==
      filteredQC.successQuantity + filteredQC.faultQuantity
    )
      alert("합계 불일치!");
    else {
      try {
        //1. 재고 추가
        await MESapi.put(`${MES_API}/stocks/${filteredQC.stock.stockNo}`, {
          normalCount: filteredQC.successQuantity,
          errorCount: filteredQC.faultQuantity,
        });
        //2. 품질 검사 상태 변경
        await MESapi.put(`${MES_API}/quality_controls/${filteredQC.qcNo}`, {
          type: "완료",
          successQuantity: filteredQC.successQuantity,
          faultQuantity: filteredQC.faultQuantity,
        });

        await MESapi.patch(
          `${MES_API}/work_orders/${filteredQC.workOrder.woNo}/type`,
          {
            type: "완료",
          }
        );

        fetchData();
      } catch (err) {
        alert("수정 실패");
      }
    }
  };

  const HandleReturnQualityControl = async (record) => {
    try {
      await MESapi.put(`${MES_API}/quality_controls/${record.qcNo}`, {
        type: "대기",
        successQuantity: 0,
        faultQuantity: 0,
      });
      await MESapi.put(`${MES_API}/stocks/${record.stock.stockNo}`, {
        normalCount: -record.successQuantity,
        errorCount: -record.faultyQuantity,
      });
      await MESapi.patch(
        `${MES_API}/work_orders/${record.workOrder.woNo}/type`,
        {
          type: "품질",
        }
      );
      fetchData();
    } catch (err) {
      alert("상태 변경 실패");
    }
  };

  return (
    <QualityControlPresenter
      value={value}
      setValue={setValue}
      qualityControls={qualityControls}
      HandleChangeQuantity={HandleChangeQuantity}
      HandleUpdateQualityControl={HandleUpdateQualityControl}
      HandleReturnQualityControl={HandleReturnQualityControl}
    />
  );
};

export default QualityControlContainer;
