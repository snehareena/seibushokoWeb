import { useEffect, useState } from "react"
import { get } from "@/pages/api/apiUtils"
import { Modal } from "@mantine/core"
import BasicTable from "./BasicTable"

export default function MFGListModal({setMfgModal, mfgModal,cutterId }) {
    const [records, setRecords] = useState([]);
    const columns = [
        {header:"MFG NO", accessorKey:"mfg_no", size:100, Cell: ({ renderedCellValue }) => <strong style={{color:'#518FE2'}}>{renderedCellValue}</strong>},
        {header:"Cutter NO", accessorKey:"cutter_no", size:100},
        {header:"Status", accessorKey:"status", size:100},
        {header:"Drawing NO", accessorKey:"drawing_no", size:100},
        {header:"Client Name", accessorKey:"client_name", size:100},
        {header:"Register By", accessorKey:"regrregister_by", size:100},
        {header:"Supplier", accessorKey:"supplier", size:100},

    ]
    useEffect(()=>{
        fetchData();
    },[cutterId])
    
    const fetchData = async ()=>{
        try{
            const data = await get(`/mfg/cutter/${cutterId}/`);
            setRecords(data);
        }catch(error){
            console.error(error);
        }
    }

  return (
    <Modal
    opened={mfgModal}
    onClose={() => setMfgModal(false)}
    size="xl"
    title="MFG"
    closeOnClickOutside={false}
    >
        <BasicTable columns={columns} data={records} mfg={true}/>
    </Modal>
  )
}
