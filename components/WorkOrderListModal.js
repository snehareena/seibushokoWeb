import { useCallback, useEffect, useState } from "react";
import { get } from "@/pages/api/apiUtils";
import { Modal } from "@mantine/core";
import BasicTable from "./BasicTable";

export default function WorkOrderListModal({
  setShowModal,
  showModal,
  cutterId,
  MfgId,
}) {
  const [records, setRecords] = useState([]);
  const columns = [
    {
      header: "Work order NO",
      accessorKey: "work_order_no",
      size: 100,
      Cell: ({ renderedCellValue }) => (
        <strong style={{ color: "#518FE2" }}>{renderedCellValue}</strong>
      ),
    },
    { header: "Status", accessorKey: "workorder_status", size: 100 },
    { header: "Cutter NO", accessorKey: "cutter_no", size: 100 },
    { header: "MFG NO", accessorKey: "mfg_no", size: 100 },
    { header: "Order NO", accessorKey: "order_no", size: 100 },
    { header: "Urgency", accessorKey: "urgency", size: 100 },
    { header: "Regrind_From", accessorKey: "regrind_from", size: 100 },
    { header: "Client Name", accessorKey: "client_name", size: 100 },
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
      title="Work Orders"
      closeOnClickOutside={false}
    >
      <BasicTable columns={columns} data={records} workOrder={true} />
    </Modal>
  );
}