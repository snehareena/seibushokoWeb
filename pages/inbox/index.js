import Layout from "@/components/layout/Layout";
import { Box, Button, Tabs, Badge, Table, ScrollArea, Loader } from "@mantine/core";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Inbox from "./Inbox";
import Link from 'next/link'
import { get } from "../api/apiUtils";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ProtectedRoute from "@/utils/ProtectedRoute";
// import Sent from "./Sent";

const DynamicSentComponent = dynamic(()=>import ('./Sent'),{
  ssr:false,
})

 function Index() {
    const { t } = useTranslation('common')
    const breadcrumbs = [
        { label: t('Inbox'), link: '/inbox' },
      ];
    const [inboxData,setInboxData] = useState([]);
    const [sentData,setSentData] = useState([]);
    const [unreadCount, setUnReadCount] = useState(0);
    const [loading, setLoading]  = useState(true);
    const [shouldShow, setShouldShow] = useState(false);

    const allMessages = async()=>{
      try{
        const inboxResponse = await get('/message/inbox')
        const reverseInbox = inboxResponse.reverse()
        setInboxData(reverseInbox);
        const sentResponse = await get('/message/sent')
        const revereSent = sentResponse.reverse();
        setSentData(revereSent);
        setLoading(false);
      }catch(error){
        console.error(error);
        setLoading(false);
      }
    }

    useEffect(()=>{
      allMessages();
    },[])
    useEffect(() => {
      // Filter unread messages after inboxData has been updated
      const unreadMessages = inboxData.filter((message) => message.msg_status === "UNREAD");
      setUnReadCount(unreadMessages.length);
    }, [inboxData]);
   
  return (
    <Layout breadcrumbs={breadcrumbs}>
      {loading? <Box style={{display:'grid', placeItems:'center'}}><Loader/></Box>
        :<Box>
        <Link href='inbox/new_message/new'><Button>{t('New Message')}</Button></Link>
        <Box>
        <Tabs color="indigo" variant="outline" radius="md" defaultValue="inbox" mt='md'>
          <Tabs.List>
            <Tabs.Tab 
            rightSection={
              <Badge
                w={16}
                h={16}
                color="indigo"
                sx={{ pointerEvents: 'none' }}
                variant="filled"
                size="xs"
                p={0}
              >
              {unreadCount}
              </Badge>
            } value="inbox"> {t('Inbox')} </Tabs.Tab>
            <Tabs.Tab value="sent" onClick={()=>setShouldShow(true)} >{t("Sent")}</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="inbox" pt="xs">
            <ScrollArea>
              <Table sx={{ minWidth: 800 }} verticalSpacing="md">
              {/* Inbox Content load here */}
                <Inbox data={inboxData}/> 
              </Table>
            </ScrollArea>
          </Tabs.Panel>

          <Tabs.Panel value="sent" pt="xs">
            <Table sx={{ minWidth: 800 }} verticalSpacing="md">
              {/* Sent Content load here */}
              {/* <Sent data={sentData}/> */}
              {shouldShow && <DynamicSentComponent data={sentData}/>}
            </Table>
          </Tabs.Panel>
        </Tabs>
        </Box>
        </Box>}
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
  export default ProtectedRoute(Index)