import Layout from "@/components/layout/Layout";
import { Box, Flex, Grid, Loader } from "@mantine/core";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from "react";
import AdminDashboard from "@/components/card/AdminDashboard";
import ClientDash from "@/components/card/ClientDashboard";
import { get } from "../api/apiUtils";
import { UserManagement } from "@/utils/UserManagement";
import ProtectedRoute from "@/utils/ProtectedRoute";

const breadcrumbs = [
    { label: 'Dashboard', link: '/client_dashboard' },
  ];
const Dashboard =()=>{

  const [visible,setVisible] = useState(false);
  const [records,setRecords] = useState([]);
  const [tools,setTools] = useState([]);
  const [orderRecord, setOrderRecord] = useState([]);
  const [username,setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const workOrderData = async()=>{
    try{
      const data = await get('/workorder/all');
      setRecords(data.reverse());
      const toolsCount = await get('/workorder/tools');
      setTools(toolsCount)
      const orderData = await get(`/order/active`);
      setOrderRecord(orderData)
      setLoading(false);
    }catch(error){
      console.error(error);
      setLoading(false)
    }
  }

  useEffect(()=>{
    const profile_data = JSON.parse(UserManagement.getItem("profile_data") || '{}');
    const visible = profile_data?.client === 1; 
    const username = profile_data.username;
    setUsername(username)
    setVisible(visible);
    workOrderData();
  },[])

    return(
        <Layout breadcrumbs={breadcrumbs}>
          {loading? <Box style={{display:'grid', placeItems:'center'}}><Loader/></Box>
            :<Grid>
                <Grid.Col span={12}>
                    <Flex direction="column" h="103%" justify="space-between">
                       {visible?<AdminDashboard username={username} tools={tools} records={records}/>:<ClientDash records={records} tools={tools} orderRecord={orderRecord} username={username}/>}    
                    </Flex>

                </Grid.Col>
            </Grid>}
        
        </Layout>
    )
}
export const getStaticProps = async ({
    locale,
  }) => ({
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common'
      ])),
    },
  })
  
export default ProtectedRoute(Dashboard) ;