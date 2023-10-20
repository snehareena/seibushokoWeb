import React, { useEffect, useState } from 'react';
import FormTable from '@/components/FormTable';
import { fetchAndTransformStaffData } from '@/pages/api/Select';
import { useTranslation } from "next-i18next";

export default function FormPart2(props) {
  const [manager, setManager] = useState([]);
  const { t } = useTranslation("common");

  const fetchAllData = async () => {
    try {
      const [managerData] = await Promise.all([
        fetchAndTransformStaffData("manager"),
      ]);
      setManager(managerData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAllData();
  }, [])
  
  const form = props.form;

  const column = [
    { colspan: 3, label: t('workOrder.POLISHING PROCESS') },
    { colspan: 1, label: t('workOrder.Number of Teeth')},
    { colspan: 1, label: t("workOrder.Date") },
    { colspan: 1, label: t("workOrder.MANAGER") },
  ];
  const handleChange = (selectedDate) => {
    const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
    form.setFieldValue('regrind_work_order.regrind_date', formattedDate);
  }; 

  const data = [
    [
      { type:"text", label: t("workOrder.MATAGI") ,rowspan:3,},
      { type: "text",label: t("workOrder.Pre-Grind / No of Teeth")},
      { type:"input",name:'regrind_work_order.pregrind_teeth_no',placeholder:t("workOrder.Pre-Grind / No of Teeth")},
      { },
      { type:"regrinddate",name:'regrind_work_order.regrind_date',rowspan:3, },
      { type:"select",name:'regrind_work_order.technician',data:manager,rowspan:3,placeholder:t("workOrder.Manager") },
    ],
     [
      { type:"text", label: t("workOrder.Target") },
      { type: "input",label: "" ,name:"regrind_work_order.target" ,placeholder: t("workOrder.Target") },
      { type:"input", label: "" ,name:"regrind_work_order.no_teeth" ,placeholder:t("workOrder.No of Teeth"),},
      
  
    ],
     [
      { type:"text", label: t("workOrder.Post Grind / No of Teeth") },
      { type: "input",label: "",name:"regrind_work_order.postgrind_teeth_no" ,placeholder:t("workOrder.Post Grind / No of Teeth")},
      {},
    ],
    [
      { type:"text", label: t("workOrder.OUTER DIAMETER") ,rowspan:3},
      { type:"text", label: t("workOrder.Before Polishing") ,},
      { type: "input",label: "⌀",name:"regrind_work_order.outdia_pregrind",colspan:2,placeholder:t("workOrder.Before Polishing") },
      { rowspan:3, },
      {rowspan:3, },
    ],    
   [   
    { type:"text", label: t("workOrder.Target") ,},
    { type: "input",label: " ± 0.05 ⌀",name:"regrind_work_order.outdia_target",colspan:2,placeholder:t("workOrder.Target") },
],
[   
  { type:"text", label: t("workOrder.Measured Value") ,},
  { type: "input",label: "⌀",name:"regrind_work_order.outdia_actual",colspan:2 ,placeholder:t("workOrder.Measured Value")},
],
  ];
  return (
    <FormTable  header={null} column={column} data={data} form={form}/>
  );
}