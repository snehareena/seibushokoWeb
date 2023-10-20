import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import i18nextConfig from '../next-i18next.config'
const getInitialProps = createGetInitialProps();

export default class MyDocument extends Document {
  static getInitialProps = getInitialProps;
  
  render() {
    const currentLocale =
  this.props.__NEXT_DATA__.locale ??
  i18nextConfig.i18n.defaultLocale

    return (
      <Html lang={currentLocale}>        
      <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}