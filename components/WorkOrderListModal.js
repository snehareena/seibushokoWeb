import { useCallback, useEffect, useState } from "react";
import { get } from "@/pages/api/apiUtils";
import { Modal } from "@mantine/core";
import BasicTable from "./BasicTable";
import {useTranslation} from 'next-i18next'

export default function WorkOrderListModal({
  setShowModal,
  showModal,
  cutterId,
  MfgId,
}) {
  const [records, setRecords] = useState([]);
  const { t } = useTranslation("common");

  const columns = [
    {
      header: t('workOrder.workOrderNo'),
      accessorKey: "work_order_no",
      size: 100,
      Cell: ({ renderedCellValue }) => (
        <strong style={{ color: "#518FE2" }}>{renderedCellValue}</strong>
      ),
    },
    { header: t('status'), accessorKey: "workorder_status", size: 100 },
    { header: t('content.cutter'), accessorKey: "cutter_no", size: 100 },
    { header: t('content.MFG'), accessorKey: "mfg_no", size: 100 },
    { header: t('content.orderno'), accessorKey: "order_no", size: 100 },
    { header: t('workOrder.urgency'), accessorKey: "urgency", size: 100 },
    { header: t('workOrder.regirndform'), accessorKey: "regrind_from", size: 100 },
    { header: t('Client Name'), accessorKey: "client_name", size: 100 },
  ];
  const fetchData = useCallback(async () => {
    let url = cutterId? `/workorder/all/${cutterId}`:`/workorder/all/mfg-${MfgId}`;
    try {
      const data = await get(url);
      setRecords(data);
    } catch (error) {
      console.error(error);
    }
  }, [cutterId,MfgId]);
  useEffect(() => {
    (cutterId ||MfgId) &&  fetchData();
  }, [cutterId,MfgId,fetchData]);


  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Modal
      opened={showModal}
      onClose={closeModal}
      size="xl"
      title= {t('Workorder')}
      closeOnClickOutside={false}
    >
      <BasicTable columns={columns} data={records} workOrder={true} />
    </Modal>
  );
}