import { UserManagement } from "@/utils/UserManagement";
import {
    IconFileAnalytics,
    IconTool,
    IconNorthStar,
    IconFridge,
    IconSquareLetterC,
    IconUser,
    IconPlayerPlay,
    IconCheckbox,
    IconFolder,
    IconDashboard,
    IconInbox,
    IconSettings,
    IconFileImport,
  } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const Navlinks = () => {
    // const [visible, setVisible] = useState(false);

    const profile_data = JSON.parse(
      UserManagement.getItem("profile_data") || "{}"
    );
    useEffect(() => {
        // let data = profile_data?.client === 1;
        // setVisible(data);
      }, []);
    const mockdata = [
        { label: "order", icon: IconCheckbox, link: "/order" },
        {
          label: "Work_Order_Regrind",
          link: "/work_order",
          icon: IconFileAnalytics,
        },
        {
          label: "Inspection_Report",
          icon: IconFolder,
          link: "/inspection_report",
        },
        // { label: "Delivery", icon: IconLock },
        {
          label: "Registration",
          icon: IconPlayerPlay,
          visible: profile_data?.client == 1 ? true:false,
          links: [
            { label: "Cutter", icon: IconTool, link: "/cutter" },
            { label: "MFG", icon: IconNorthStar, link: "/mfg" },
            { label: "Regrind Type", icon: IconSettings, link: "/regrind_type" },
            { label: "Product", icon: IconSettings, link: "/product" },
            { label: "Machines", icon: IconFridge, link: "/machines" },
            { label: "Client", icon: IconSquareLetterC, link: "/client" },
            { label: "User Management", icon: IconUser, link: "/user" },
            // { label: "Import/Export", icon:IconGradienter, link: "/" },
          ],
        },
        {label: "Import/Export",icon: IconFileImport,visible: profile_data?.client == 1 ? true:false,link:"/importExport"},
        {
          label:"Dashboard",
          icon: IconDashboard,
          link: "/client_dashboard",
        },
        { label: "Inbox", icon: IconInbox, link: "/inbox" },
      ];
  return mockdata;
}

export default Navlinks