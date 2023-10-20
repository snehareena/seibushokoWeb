import { useMantineTheme } from '@mantine/core';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import React from 'react'
import { useRouter } from 'next/router';

const BasicTable = (props) => {
    const { colorScheme } = useMantineTheme();
    const router = useRouter();
        const {columns, data, search, pagination, workOrder, mfg}=props;
    const table = useMantineReactTable({
        enableHiding:false, 
        enablePagination:pagination,
        enableGlobalFilter:search,
        columns:columns,
        data:data,
        enableSorting: false,
        enableColumnFilters: false,
        mantineTableProps: {
          striped:true,
          withColumnBorders: true,
          withBorder:true,
          withBorder: colorScheme === 'light',
        },   initialState: {
           showGlobalFilter: true,
           density: 'xs' },
          enableDensityToggle:false,
          enableFullScreenToggle: false,
          mantineTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
              if(workOrder){
                router.push(`/work_order/add_workorder/edit/${row.original.id}`)
              }
              if(mfg){
                router.push(`/mfg/add_mfg/edit/${row.original.id}`)
              }
            },
            sx: {
              cursor: 'pointer', 
            },
          }),
      });
  return (
    <MantineReactTable  table={table}  mantineTableHeadCellProps={{
        sx: {
          backgroundColor: 'rgba(52, 210, 235, 0.1)',
          borderRight: '1px solid rgba(224,224,224,1)',
          color: '#fff'
        },
      }}/>
  )
}

export default BasicTable;