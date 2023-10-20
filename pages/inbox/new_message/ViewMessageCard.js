import { Box, Button, Divider, Flex, Grid, Group, Paper, Text, Textarea } from "@mantine/core";
import {useStyles} from '../../../styles/newmsg_style'
import { get, put } from "@/pages/api/apiUtils";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IconFile } from "@tabler/icons-react";
import { UserManagement } from "@/utils/UserManagement";

const id= UserManagement.getItem("id");
const data=  parseFloat(id)
export default function ViewMessageCard({value}) {
    const {classes} = useStyles();
    const [messageData, setMessageData] = useState([]);
    const [date,setDate] = useState('');
    const [fromEmail, setFromEmail] = useState('');
    const [staffId, setStaffId] = useState(false)
    const { t } = useTranslation("common");
    const [subject, setSubject] = useState('');
    let formattedDate = new Date(date).toLocaleDateString();

    const form = useForm({
      initialValues:{
        msg_content:""
      },
      validate:{
        msg_content:(value)=> value.length == 0 && 'Message Content Required'
      }
    })
    
    const fetchMessage =useCallback(async () => {
      try{
        const response = await get(`/message/${value}`);
        setMessageData(response);
        const { msg_date,msg_title,from_mail } = response[0];
        setDate(msg_date);
        setFromEmail(from_mail);
        setSubject(msg_title);
      }catch(error){
        console.error(error);
      }
    }, [value]);
    useEffect(()=>{
      fetchMessage();
      setStaffId(data)
    },[fetchMessage])

    const updateMessage = async()=>{
      try{
        let formData = new FormData();
        formData.append('msg_content',form.values.msg_content)
        const response = await put(`/message/${value}`,formData)
        notifications.show({
          title:t("Success"),
          message:t(response),
          color:'green'
        })
        form.reset();
        fetchMessage();
      }catch(error){
        notifications.show({
          title:t('Error'),
          message:t(error),
          color:'red'
        })
      }
    }

    const submitHandler =(event)=>{
      event.preventDefault()
      if(!form.validate().hasErrors){
        updateMessage();
      }
      
    }

    const downloadAttachment = (url)=>{
      window.location.href = url;
    }

  return (
    <Box >
    <form className={classes.form} >
        <Paper shadow="lg" size='xl' p='md' radius='md' withBorder>
          <Paper>
            <Text size='xl' fw={500}>{subject} </Text>
            <Flex justify='space-between'>
            <Text size='xs' c='dimmed'>From: {fromEmail} </Text>
            </Flex>
          </Paper>
          <Divider my='md' color="indigo"/>
            {messageData.map((message,index)=>(
          <Box key={index}>
            {message.msg_sender !== staffId ?
            <Paper bg='lightgray' radius='md' p='xs' mr='xl'mt='md'>
                <Flex direction='column' >
                  <Text>{message.msg_content}</Text>
                  <Group position="right">
                    <Text size='xs' c='dimmed'>{formattedDate}</Text>           
                  </Group>

                </Flex>
                {message.msg_attach == null ? 
                null:
                <Group p='xs' bg='white' position="left">
                <IconFile cursor='pointer' onClick={()=>downloadAttachment(message.msg_attach)}/>
                </Group>}
            </Paper>:
            
            <Paper bg='lightblue' radius='md' p='xs' mt='md' ml='xl'>
              <Flex direction='column'>
                <Text>{message.msg_content}</Text>
                <Group position="left">
                  <Text size='xs' c='dimmed'>{formattedDate}</Text>           
                </Group>
              </Flex>
              {message.msg_attach == null ? 
                null:
                <Group p='xs' bg='white' position="left">
                <IconFile/>
                </Group>}
            </Paper>}
          </Box>
            ))}
        </Paper>

    </form>

    <Grid mt='xs' ml='xl' justify='center' align='center'>
            <Grid.Col span={10}>
                <Textarea  
                placeholder="Type your message here" 
                name="msg_content"
                {...form.getInputProps('msg_content')}
                />
            </Grid.Col>
            <Grid.Col span="content">
                <Button 
                color="green"
                type="submit"
                onClick={submitHandler}
                >
                {t('Send')}
                </Button>
            </Grid.Col>   
        </Grid>
    </Box>
  )
}
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
