import React, { useEffect, useState } from "react";
import { get } from "@/pages/api/apiUtils";
import { Modal } from "@mantine/core";
import BasicTable from "./BasicTable";
import { removeNulls } from "@/utils/removeNulls";

function OrderDataTable({ form, setOrderShowModal, showOrderModal }) {
  const [records, setRecords] = useState([]);
  useEffect(() => { 
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await get("/order/new");
      setRecords(data);
    } catch (error) {
      console.error(error);
    }
  };   
  const autofilWorkOrder=(id)=>{
    let Orderdata =get(`/order/${id}/workorder`);
    let data= Orderdata.then(
     (data) => { 
      removeNulls(data);
        form.setValues({"order_no":id,"client_id":data.client_id,"cutter_no":data.cutter_no ,"geardrawing_no":data.drawing_no,
        "mfg_no":data.mfg_no,"module":data.module,"product_no":data.product,"regrind_count":data.regrind_count,
        "regrind_type":data.regrind_type})
     },
     (error) => { 
        console.log(error);
     })
    form.setValues({})
   
   } 
  const handleRowClick = (row) => {
    setOrderShowModal(false);
    autofilWorkOrder(row);
  };

const columns=[
  {header:'Order', accessorKey: "order_no",    mantineTableBodyCellProps: ({ cell }) => ({
    onClick: () => {
      let id =cell.row.original.id;
      handleRowClick(id);
    },
  }),},
  {header:'Cutter#',  accessorKey: 'cutter_no', },
  { header:'MFG#', accessorKey: 'mfg_no', },
  {header:'Drawing#',  accessorKey: 'drawing_no', },
  { header:'Date', accessorKey: 'order_date', },
  { header:'Product', accessorKey: 'product', },
  {header:'Remark',  accessorKey: 'remarks', },

]
  return (
    <Modal
      opened={showOrderModal}
      onClose={() => setOrderShowModal(false)}
      size="xl"
      title="Order No"
      closeOnClickOutside={false}
    >
      <BasicTable columns={columns} data={records}/>
    </Modal>
  );
}

export default OrderDataTable;