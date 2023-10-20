import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const TabTitle = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Update the title when the route changes
    const handleRouteChange = (url) => {
      const pageTitle = getPageTitle(url);
      document.title = pageTitle;
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const getPageTitle = (url) => {
    const pageTitle = url.slice(1).toUpperCase();
    return pageTitle;
  };

  return (
    <div>
      <Head>
        <title>{getPageTitle(router.asPath)}</title>
      </Head>
      {children}
    </div>
  );
};

export default TabTitle;
