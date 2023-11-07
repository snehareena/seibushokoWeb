import React, { useEffect, useState } from "react";
import { get } from "@/pages/api/apiUtils";
import { Modal } from "@mantine/core";
import BasicTable from "./BasicTable";
import {useTranslation} from 'next-i18next'

function CustomDataTable({  setShowModal, showModal ,form,setCutter}) {

  const [records, setRecords] = useState([]);
  const { t } = useTranslation("common");
 const handleRowClick=(row)=>{
  setShowModal(false);
  form.setValues({ "cutter_no": row.id, 
  "module": row.module==null?"":parseFloat(row.module),"process_type": row.type,"supplier":row.supplier,
  "gear_dwg_no":row.cutter_dwg_no,
});
 }
  const columns=[
    { header: t('cutter.Cutter No'), accessorKey:"cutter_no" ,    mantineTableBodyCellProps: ({ cell }) => ({
      onClick: () => {
        let row =cell.row.original;
        handleRowClick(row)
      },
    }),},
    { header: t('cutter.Type'), accessorKey: "type" },
    { header: t('cutter.Cutter Drawing No'), accessorKey: "cutter_dwg_no" },
    { header: t('cutter.Module'), accessorKey: "module" },
    { header: t('cutter.Pressure Angle'), accessorKey: "pressure_ang" },
    { header: t('cutter.Lead'), accessorKey: "lead" },
    { header: t('cutter.Helix Angle'), accessorKey: "helix_angle" },
    { header: t('cutter.Number Of Teeth'), accessorKey: "no_of_teeth" },
    { header: t('cutter.Hardness'), accessorKey: "hardness" },
    { header: t('cutter.Supplier'), accessorKey: "supplier" },
    { header: t('Client.Client'), accessorKey: "client_name" },
  ]
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await get("/cutter/");
      setRecords(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      opened={showModal}
      onClose={() => setShowModal(false)}
      size="xl"
      title={t('cutter.Cutter No')}
      closeOnClickOutside={false}
    >
            <BasicTable columns={columns} data={records}/>
    </Modal>
  );
}

export default CustomDataTable;