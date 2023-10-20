import { ActionIcon, Box, Flex, Group, Text, Tooltip } from "@mantine/core";
import { IconEye, IconMessage } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function Inbox({data}) {
  const router = useRouter();
  const { t } = useTranslation('common')


  const viewMessage=(id)=>{
    router.push(`inbox/new_message/${id}`);
  }

    const rows = data?.map((item) => (
        <tr key={item.id}>
          <td>
            <Group spacing="sm">
              <IconMessage size="1.5rem" strokeWidth={1.5} color="indigo"  />
              <Box>
                <Flex>
                <Text mr='xs' fz="sm" fw={item.msg_status == 'UNREAD'? 700:500}>
                  {item.from_client}:
                </Text>
                <Text color="indigo" fz="sm" fw={item.msg_status == 'UNREAD'? 700:500}>
                  {item.msg_title}
                </Text>

                </Flex>
              </Box>
            </Group>
          </td>
          <td>
            <Group spacing={0} position="right">
              <ActionIcon>
                <Tooltip label={t('View Messge')}>
                    <IconEye size="1.2rem" onClick={()=>viewMessage(item.msg_parent)} stroke={2} />
                </Tooltip>
              </ActionIcon>
            </Group>
          </td>
        </tr>
      ));

  return (
    <tbody>{rows}</tbody>
  )
}