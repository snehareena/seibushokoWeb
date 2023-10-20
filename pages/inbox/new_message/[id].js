import Layout from "@/components/layout/Layout";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router';
import MessageCard from './MessageCard';

export default function Message({params}) {

    const router = useRouter();
    const { id } = router.query;
    const { t } = useTranslation('common');
    const breadcrumbs = [
        { label:  t('Inbox'), link: '/inbox' },
        { label:t('Message'), link:'/inbox/new_message'}
      ]; 
  return (
    <Layout breadcrumbs={breadcrumbs}>
      <MessageCard value={id}/>
    </Layout>
  )
}
export const getStaticPaths = async () => {

    return {
        paths: [],
        fallback: 'blocking'
    }
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
