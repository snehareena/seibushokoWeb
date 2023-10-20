import React, { useEffect, useState } from "react";
import { get } from "@/pages/api/apiUtils";
import { Modal } from "@mantine/core";
import BasicTable from "./BasicTable";

function CustomDataTable({  setShowModal, showModal ,form,setCutter}) {

  const [records, setRecords] = useState([]);
 const handleRowClick=(row)=>{
  setShowModal(false);
  form.setValues({ "cutter_no": row.id, 
  "module": row.module==null?"":parseFloat(row.module),"process_type": row.type,"supplier":row.supplier,
  "gear_dwg_no":row.cutter_dwg_no,
});
 }
  const columns=[
    { header: "Cutter No", accessorKey:"cutter_no" ,    mantineTableBodyCellProps: ({ cell }) => ({
      onClick: () => {
        let row =cell.row.original;
        handleRowClick(row)
      },
    }),},
    { header: "Type", accessorKey: "type" },
    { header: "Cutter Drawing No", accessorKey: "cutter_dwg_no" },
    { header: "Module", accessorKey: "module" },
    { header: "Pressure Angle", accessorKey: "pressure_ang" },
    { header: "Lead", accessorKey: "lead" },
    { header: "Helix Angle", accessorKey: "helix_angle" },
    { header: "Number Of Teeth ", accessorKey: "no_of_teeth" },
    { header: "Hardness", accessorKey: "hardness" },
    { header: "Supplier", accessorKey: "supplier" },
    { header: "Client", accessorKey: "client_name" },
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
      title="Cutter No"
      closeOnClickOutside={false}
    >
            <BasicTable columns={columns} data={records}/>
    </Modal>
  );
}

export default CustomDataTable;