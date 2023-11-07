import { Box, Card, Title, createStyles, rem, Anchor, Flex } from "@mantine/core";
import Link from "next/link";
import { StatusGroup } from "./StatusGroup";
import { WelcomeCard } from "./WelcomeCard";
import { useTranslation } from "next-i18next";
import BasicTable from "../BasicTable";
import formatdate from "@/utils/formatdate";


const useStyle = createStyles(theme => ({
	section: {
		padding: theme.spacing.lg,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
    link: {
		padding: theme.spacing.lg,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
        fontFamily:'-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
        color:'#228be6',
        textDecoration:'none',
        transition: 'text-decoration 0.2s ease',
        '&:hover': {
            textDecoration: 'underline',
        },
	},
}));

export default function AdminDashboard({records,tools,username}) {
    const { classes } = useStyle();
    const { t } = useTranslation("common");
    const tableData = records.slice(0,6)
 const columns=[
      { header: t('workOrder.workOrderNo'), accessorKey: "work_order_no", size:100  },
      { header: t('Client Name'), accessorKey: "client_name", size:80 },
      { header: t('workOrder.cutterno'), accessorKey: "cutter_no", size:80 },
      { header: t('workOrder.mfgno'), accessorKey: "mfg_no", size:80 },
      // { header: t('workOrder.geardrwno'), accessorKey: "geardrawing_no", size:100 },
      { header: t('workOrder.orderno'), accessorKey: "order_no", size:100 },
      { header: t('workOrder.orderdate'), accessorKey: "workorder_date",  Cell: ({ renderedCellValue }) => formatdate(renderedCellValue), size:100 },
      { header: t('Estimated Finish'), accessorKey: "delivery_date", Cell: ({ renderedCellValue }) => formatdate(renderedCellValue),  size:100 },
      { header: t('status'), accessorKey: "workorder_status", size:100 },
      ]
  return (
    <Box>
        <WelcomeCard username={username}/>
        <StatusGroup data={tools}/>
        <Card radius="md" shadow='xl' mt='lg'>
			<Card.Section >
                <Flex justify='space-between'>
                <Title className={classes.section} order={5}>{t('Workorder')}</Title>
                    <Link href='/work_order'className={classes.link}> {t('view All')}</Link>
                </Flex>
			</Card.Section>
      <BasicTable columns={columns} data={tableData} search={false} pagination={false}/>
		</Card>
    </Box>
  )
}
