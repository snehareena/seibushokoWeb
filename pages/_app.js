import { Notifications } from '@mantine/notifications';
import '@/styles/globals.css'
import TabTitle from '@/components/TabTitle';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '@/utils/cookieService';
import { NavigationProvider } from '@/context/NavigationContext';

function App(props) {
  const { Component, pageProps, } = props;
  const router = useRouter();

  useEffect(()=>{
    const token = getToken();
    if(token){
      router.pathname.includes('/login')?router.push('client_dashboard'):router.push(router.pathname);
    }
    else if (!token && !router.pathname.includes('/login') && !router.pathname.includes('/forgot_password')) {
      router.push('/login');
    }
  },[])
  return (
    <NavigationProvider>
              <Notifications autoClose={4000} position="top-right" />
              <TabTitle>
                <Component {...pageProps} />
              </TabTitle>
    </NavigationProvider>
  );
}
export default appWithTranslation(App)