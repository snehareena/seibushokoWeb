import { Box, Card, Space, Title, createStyles, rem, Flex} from '@mantine/core'
import { StatusGroup } from './StatusGroup'
import Link from 'next/link';
import { useTranslation } from "next-i18next";
import BasicTable from '../BasicTable';
import { WelcomeCard } from './WelcomeCard';

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
export default function ClientDashboard({records,tools,username,orderRecord}) {
	const { classes } = useStyle();
    const { t } = useTranslation("common");
    const tableData = records.slice(0,7)
    const orderData = orderRecord.slice(0,7)

 const  columns=[
    { header: t('workOrder.workOrderNo'), accessorKey: "work_order_no", size:100 },
    { header: t('workOrder.cutterno'), accessorKey: "cutter_no", size:100 },
    { header: t('workOrder.mfgno'), accessorKey: "mfg_no", size:100 },
    { header: t('workOrder.orderno'), accessorKey: "order_no", size:100 },
    { header: t('workOrder.orderdate'), accessorKey: "workorder_date", size:100 },
    { header: t('Estimated Finish'), accessorKey: "delivery_date", size:100 },
    { header: t('status'), accessorKey: "workorder_status", size:100 },
    ]
const  orderColumns=[
    {header: t('content.orderno'), accessorKey: "order_no", size:100, },
    {header: t('content.cutter'),  accessorKey: 'cutter_no', size:100 },
    {header: t('content.MFG'), accessorKey: 'mfg_no', size:100 },
    {header: t('content.drawing'),  accessorKey: 'drawing_no', size:100 },
    {header: t('content.Product'), accessorKey: 'product', size:100 },
    {header: t('content.remark'),  accessorKey: 'remarks', size:100 },
    ]
  return (
    <Box>
        <WelcomeCard username={username}/>
        <StatusGroup data={tools}/>
		<Card radius="md" shadow='xl' mt='lg'>
			<Card.Section>
                <Flex justify='space-between'>
				<Title className={classes.section} order={5}>Work order</Title>
                <Link href='/work_order'className={classes.link}> {t('view All')}</Link>
                </Flex>
            </Card.Section>
            <BasicTable columns={columns} data={tableData} search={false} pagination={false}/>
		</Card>
		<Card radius="md" shadow='xl' mt='lg'>
			<Card.Section>
            <Flex justify='space-between'>
				<Title className={classes.section} order={5}>Order</Title>
                <Link href='/order'className={classes.link}> {t('view All')}</Link>
                </Flex>
			</Card.Section>
            <BasicTable columns={orderColumns} data={orderData} search={false} pagination={false}/>
		</Card>
    </Box>
  )
}
