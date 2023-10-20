import FormTable from "@/components/FormTable";
import React from "react";
import { useTranslation } from "next-i18next";

const FormPart3 = (props) => {
  const {form}= props;
  const { t } = useTranslation("common");

  const column = [
    { colspan: 3, label: t('inspection.TOOLS INSPECTION ITEM') },
    { colspan: 1, label: t('inspection.No Of Polishing Times')},
  ];
  
  const data = [
    [
      { type:"text", label: t('inspection.Tooth Profile Error') },
      { type: "input",label: "",name:"tooth_profile_err" },
      { type:"file", label: t('inspection.ProfileErr Img') ,name:"profile_err_img"},
      { type: "number" , label: "", rowspan:4,name:"no_polishing_times",precision:6},
    ],
     [
      { type:"text", label: t('inspection.Total Helix Deviation') },
      { type: "input",label: "" ,name:"total_helix_deviation"},
      { type:"file", label: t('inspection.ExtractionErr Img') ,name:"extraction_err_img"},
    ],
     [
      { type:"text", label: t('inspection.Tooth Groove Runout')},
      { type: "input",label: "",name:"tooth_groove_runout" },
      { type:"file", label:t('inspection.RunOut Img'),name:"runout_img" },
    ],
    [
      { type:"text", label: t('inspection.Pitch Error') },
      { type: "input",label: "",name:"pitch_err" },
      { type:"file", label: t('inspection.PitchOut Img'),name:"pith_out_img" },
    ],
  
  ];

  return (
   <FormTable header={null} column={column} data={data} form={form}/>
  );
};

export default FormPart3;
