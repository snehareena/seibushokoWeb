import Layout from "@/components/layout/Layout";
import {
  Title,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getFormattedDate } from "@/utils/dateUtils";
import { notifications } from "@mantine/notifications";
import { get, post, put } from "@/pages/api/apiUtils";
import { useRouter } from "next/router";
import {  useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { UserManagement } from "@/utils/UserManagement";
import { removeNulls } from "@/utils/removeNulls";
import Formpart1 from "@/components/fields/inspection_rpt/formpart1";
import FormPart2 from "@/components/fields/inspection_rpt/formpart2";
import FormPart3 from "@/components/fields/inspection_rpt/formpart3";
import FormPart4 from "@/components/fields/inspection_rpt/formpart4";
import FormPart5 from "@/components/fields/inspection_rpt/formpart5";
import FormPart6 from "@/components/fields/inspection_rpt/formpart6";
import FormPart7 from "@/components/fields/inspection_rpt/formpart7";
import SubmitButtons from "@/components/SubmitButtons";
import ProtectedRoute from "@/utils/ProtectedRoute";

const registerBy = UserManagement.getItem("id");
const userid = parseInt(registerBy);
const AddInspectionReport = () => {
  const initialDate = getFormattedDate();
  const router = useRouter();
  const [visible, setVisible] = useState(false)
  const { slug } = router.query;
  const isEditing = slug && slug[0] === "edit";
  const id = slug && slug[1]; // Extract the id from the slug array
  const { t } = useTranslation('common');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    initialValues: {
        report_trial: {
          cc_angle_axial_cross: "",
          cc_diagonal_angle: "",
          cc_cutter_speed: "",
          cc_tranverse_feed1: "",
          cc_tranverse_feed2: "",
          cc_amount_cut: "",
          cc_no_of_cuts: "",
          cc_stroke:"",
          cc_straddle_thickness: "",
          cc_no_teeth: "",
          cc_obd: "",
          cc_obd_dia: "",
          cc_approach: "",
          pc_angle_axial_cross:"",
          pc_cutter_speed: "",
          pc_plunge_feed:"",
          pc_amount_cut: "",
          pc_t1:"",
          pc_t2: "",
          pc_t3: "",
          pc_bm_amount: "",
          pc_straddle_thickness: "",
          pc_no_teeth: "",
          pc_obd: "",
          pc_obd_dia: "",
          pc_approach: ""
        },
        serial_no: "",
        order_date: initialDate,
        gear_dwg_no: "",
        ts_module: "",
        ts_pressure_angle: "",
        ts_no_teeth:"",
        ts_helix_angle: "",
        ts_helix_direction: "LEFT",
        ts_material: "",
        tw_work_no: "",
        tw_disloc_coeff: "",
        tw_no_teeth: "",
        tw_helix_angle: "",
        tw_twist_direction: "LEFT",
        tw_material: "",
        specified_profile: "",
        trial: "TRIAL",
        tooth_profile_err: "",
        profile_err_img: '',
        total_helix_deviation: "",
        extraction_err_img: '',
        tooth_groove_runout: "",
        runout_img: '',
        pitch_err: "",
        pith_out_img: '',
        no_polishing_times: "",
        outside_dia:"",
        straddle_tooth_thick: "",
        no_straddle_tooth: "",
        overball_measure: "",
        overball_dia: "",
        axial_dist_life_span: "",
        sign_date: initialDate,
        test_date: initialDate,
        report_status: "NEW",
        created_at: initialDate,
        updated_at: initialDate,
        work_order: "",
        cutter_no: "",
        order_no: "",
        client: "",
        ts_shaving_method: "",
        person_charge:userid,   
        ...(isEditing &&{ delete_image: [] }),
       },
    validate: {
      trial:(value)=> value==null && 'Trial is required',
      work_order:(value)=>value==0 && 'Work Order is required',
    },
  });
  const breadcrumbs = [
    { label: t('inspectionReport'), link: "/inspection_report" },
    { label: isEditing?t("edit_inspectionreport"):t("add__inspectionreport"), link: "" },
  ];
  const fetchData  = async () => {
    try {
      const api_data = await get(`report/${id}/`);
      const nulltostring = removeNulls(api_data);
      form.setValues(nulltostring);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isEditing && id) {
      fetchData();
    }
  }, [id,isEditing]);
  const fetchClientId = () =>{
    const profile_data = JSON.parse(UserManagement.getItem("profile_data") || '{}');
    const visible = profile_data?.client === 1;    
   setVisible(visible)
  }

  useEffect(() => {
    fetchClientId();
  }, [])

  
  const createOrUpdateData = async (addanother) => {
    try {
      let formData = new FormData();
      let data = form.values;
  
      if (typeof(data.profile_err_img)!='object' || data.profile_err_img==null) {
        data = { ...data, profile_err_img: '' };
      }
      if (typeof(data.extraction_err_img)!='object' || data.extraction_err_img==null) {
        data = { ...data, extraction_err_img: '' };
      }
      if (typeof(data.pith_out_img)!='object' || data.pith_out_img==null) {
        data = { ...data, pith_out_img: '' };
      }
      if (typeof(data.runout_img)!='object' || data.runout_img==null) {
        data = { ...data, runout_img: '' };
      }

      for(let key in data) {
        if((key) == 'report_trial') {
          for (let subKey in data[key]) {
            formData.append(`${key}.${subKey}`, data[key][subKey]!=null?data[key][subKey]:"");
          }
        }
        else {
          formData.append(key, data[key]!=null?data[key]:"");
        }
      }
      const endpoint = isEditing ? `/report/${id}/` : "/report/";
      const response = isEditing
        ? await put(endpoint, formData  )
        : await post(endpoint, formData);
      const message = isEditing ? t('Update') : t('Success');
      notifications.show({
        title: message,
        message: t(response),
        color: "green",
      });
      form.reset();
      addanother? form.setFieldValue("person_charge",userid): router.push("/inspection_report");
    } catch (error) {
      notifications.show({
        title: t('Error'),
        message: t(error.trim()),
        color: "red",
      });
    }
    finally {
      setIsSubmitting(false); // Reset the submission state
    }
  };
  const onSubmit = (e, addanother) => {
    e.preventDefault();
    setIsSubmitting(true);
    form.validate();
    if (!form.validate().hasErrors) {
      createOrUpdateData(addanother);
    } else {
      notifications.show({
        title: t('Error'),
        message: t('Please fill the mandatory feilds.'),
        color: 'red',
      });
      setIsSubmitting(false);
    }
  };
  return (
    <Layout breadcrumbs={breadcrumbs}>
      <Title order={3}>{isEditing?t("edit_inspectionreport"):t("add__inspectionreport")}</Title>
      <Formpart1 form={form} isEditing={isEditing}/>
      <FormPart2 form={form} />
      <FormPart3 form={form} />
      <FormPart4 form={form} />
      <Flex>
      <FormPart5 form={form} />
      <FormPart6 form={form} /></Flex>
      <FormPart7 form={form} />
      {visible == 1 &&
          <SubmitButtons isEditing={isEditing} onSubmit={onSubmit} isSubmitting={isSubmitting}/>}
    </Layout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
export default ProtectedRoute(AddInspectionReport) ;