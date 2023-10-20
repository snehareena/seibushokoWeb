import React, { useState } from 'react';
import { NavbarNav } from '../navbar/Navbar';
import { HeaderMenu } from '../header/Header';
import { MantineProvider,Paper, AppShell } from '@mantine/core';

const Layout = ({ children, breadcrumbs }) => {

  return (
      <AppShell
      padding='xs'
      navbar={<NavbarNav />}
      header={<HeaderMenu breadcrumbs={breadcrumbs}/>}
      >
        <Paper withBorder shadow="xl" p="md" >
          {children}
        </Paper>
      </AppShell>     
  );
};

export default Layout;
