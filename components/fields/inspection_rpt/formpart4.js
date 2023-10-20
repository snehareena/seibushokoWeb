import FormTable from "@/components/FormTable";
import React from "react";
import { useTranslation } from "next-i18next";

const FormPart4 = (props) => {
  const {form}= props;
  const { t } = useTranslation("common");

  const data = [
    [
      { type:"text", label: t('inspection.Measure Outside Diameter') },
      { type: "number",label: "" ,name:"outside_dia",precision:6},
      { type:"text", label: t('inspection.Axial Distance Life Span')},
  
    ],
     [
      { type:"text", label: t('inspection.Straddle Tooth Thickness') },
      { type: "number",label: "" ,name:"straddle_tooth_thick",precision:6},
      { type:"number", label: "Ø" ,name:"axial_dist_life_span",precision:6},
  
    ],
     [
      { type:"text", label: t('inspection.Number of Straddle Teeth') },
      { type: "number",label: "" ,name:"no_straddle_tooth",precision:6 },
      { },
    ],
    [
      { type:"text", label: t('inspection.Overball Measurement') },
      { type: "number",label: "" ,name:"overball_measure",precision:6},
      {},
  
    ],
    [
      { type:"text", label: t('inspection.Overball Diameter') },
      { type: "input",label: "",name:"overball_dia" },
      {  },
    ],
  ];

  return (
 <FormTable  header={null} column={[]} data={data} form={form}/>
  );
};

export default FormPart4;
