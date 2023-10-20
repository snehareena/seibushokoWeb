import Layout from "@/components/layout/Layout";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ImportOrder from "./order";
import ImportWorkOrder from "./workorder";
import Export from "./export";

export default function Index() {
  const { t } = useTranslation('common')

  const breadcrumbs = [{ label: t('Import/Export'), link: '/importExport' },];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <ImportOrder/>
      <ImportWorkOrder/>
      <Export/>
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
