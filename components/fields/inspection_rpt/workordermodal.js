import React, { useEffect, useState } from "react";
import { get } from "@/pages/api/apiUtils";
import {  Modal } from "@mantine/core";
import BasicTable from "@/components/BasicTable";
import { removeNulls } from "@/utils/removeNulls";

function WorkOrderModal({ form, setShowModal, showModal,isEditing }) {
  const [records, setRecords] = useState([]);
  useEffect(() => { 
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await get("/workorder/finished");
      setRecords(data);
    } catch (error) {
      console.error(error);
    }
  };    
  const autofilInspectionReport=(id)=>{
    let trialConditionData = get(`workorder/report/${id}`);
      trialConditionData.then((data)=>{
        removeNulls(data);
        if(data.regrind_type == "Conventional"){
          form.setFieldValue('report_trial',{
            ...form.values.report_trial,
            cc_angle_axial_cross: data.angle_axial_cross,
            cc_diagonal_angle:data.diagonal_angle,
            cc_cutter_speed: data.cutter_speed,
            cc_tranverse_feed1: data.tranverse_feed1,
            cc_tranverse_feed2: data.tranverse_feed2,
            cc_amount_cut: data.amount_cut,
            cc_stroke: data.stroke,
            cc_no_teeth: data.no_teeth,
            cc_obd: data.obd,
            cc_obd_dia: data.obd_dia,
            //more feilds will be added, once api has it. 
          })
        }
        if(data.regrind_type == "Plunge"){
          form.setFieldValue('report_trial',{
            ...form.values.report_trial,
            pc_angle_axial_cross: data.angle_axial_cross,
            pc_cutter_speed: data.cutter_speed,
            pc_amount_cut:data.amount_cut,
            pc_t1: data.t1,
            pc_t2: data.t2,
            pc_t3: data.t3,
            pc_bm_amount: data.bm_amount,
            pc_no_teeth: data.no_teeth,
            pc_obd: data.obd,
            pc_obd_dia: data.obd_dia,
          })
        }
      },(error)=>{
        console.log(error)
      })
    let WorkOrderdata =get(`/workorder/${id}`);
      WorkOrderdata.then(
     (data) => { 
      removeNulls(data);
        form.setValues({"work_order":id,"client":data.client_id,"cutter_no":data.cutter_no ,
        "order_no":data.order_no,"serial_no":data.mfg_no, "gear_dwg_no":data.geardrawing_no,
        "ts_module":data.module, 
        "ts_shaving_method":data.regrind_type,
        "trial":data.test,"no_polishing_times":data.regrind_count,
       "product_no":data.product,"regrind_count":data.regrind_count,
        "regrind_type":data.regrind_type})
     },
     (error) => { 
        console.log(error);
     })
   
   }
const  columns=[{header: 'Work Order No', accessorKey:"work_order_no" ,    mantineTableBodyCellProps: ({ cell }) => ({
  onClick: () => {
    let id =cell.row.original.id;
    handleRowClick(id)
  },
}),},
{ header: 'Cutter No',accessorKey:"cutter_no" },
{ header: ' MFG No', accessorKey:"mfg_no" },
{ header: 'Gear Dwg No',accessorKey:"geardrawing_no", },
{ header: 'Product No ',accessorKey:"product_no",},
{ header: ' Order No', accessorKey:"order_no"},
{ header: ' Regrind Type',accessorKey:"regrind_type", },
{ header: ' Regrind Form', accessorKey:"regrind_from" },
{ header: ' Order Date',accessorKey:"workorder_date",},
{ header: ' Location',accessorKey:"location", },
{ header: ' Status', accessorKey:'workorder_status' },
{ header: ' Client', accessorKey:"client_name"},
{ header: ' Urgency',accessorKey:"urgency",},]
const handleRowClick = (row) => {
  setShowModal(false);
  autofilInspectionReport(row);
};

  return (
    <Modal
      opened={showModal}
      onClose={() => setShowModal(false)}
      size="55%"
      title="Work Order No"
      closeOnClickOutside={false}
    >
     <BasicTable columns={columns} data={records}/>
    </Modal>
  );
}

export default WorkOrderModal;