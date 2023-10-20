import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Burger,
  Flex,
  NavLink,
  Navbar,
  ScrollArea,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import navlinks from "../fields/navlinks";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { UserManagement } from "@/utils/UserManagement";
import { useNavigation } from "@/context/NavigationContext";

export function NavbarNav() {
  const { t } = useTranslation("common");
  const [expanded, setExpanded] = useState(true);
  const [visible, setVisible] = useState(false);
  const [clientName, setClientName] = useState("");
  const { navLinkStates, setNavLinkStates } = useNavigation();
  const mockdata=navlinks();
  const profile_data = JSON.parse(
    UserManagement.getItem("profile_data") || "{}"
  );
  useEffect(() => {
    let visible = profile_data?.client === 1;
    setVisible(visible);
    const client = profile_data.client_name;
    setClientName(client);
  }, []);
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  // Function to toggle the state of a top-level link
 
  const [translatedMockdata, setTranslatedMockdata] = useState(mockdata);
  const handleToggleSidebar = () => {
    setExpanded((prevExpanded) => !prevExpanded);
    toggle();
  };

  useEffect(() => {
    setMockdataWithTranslatedLabels();
  }, [t]);

  const setMockdataWithTranslatedLabels = () => {
    const translateItem = (item) => {
      const translatedLabel = t(`${item.label}`);
      if (item.links) {
        const translatedLinks = item.links.map((linkItem) => ({
          ...linkItem,
          label: t(`${linkItem.label}`),
        }));
        return { ...item, label: translatedLabel, links: translatedLinks };
      } else {
        return { ...item, label: translatedLabel };
      }
    };
    const userMockdata = mockdata.filter((item) => item.visible !== false);
    const translatedMockdata = userMockdata.map(translateItem);
    setTranslatedMockdata(translatedMockdata);
  };
  const handleToggleNavLink = (label) => {
    // Toggle the open/closed state for a specific NavLink
    setNavLinkStates((prevStates) => ({
      ...prevStates,
      [label]: !prevStates[label],
    }));
  };
  const renderNavLink = (item) => (
    <NavLink
      opened={navLinkStates[item.label]}
      onChange={(e) => {
        console.log(e);
        handleToggleNavLink(item.label); // Toggle the specific NavLink's state when clicked
      }}
      key={item.label}
      variant="filled"
      label={expanded && item.label}
      active={item.link === router.pathname}
      onClick={(e) => {
        e.preventDefault();
        item.link && router.push(item.link);
      }}
      icon={
        <ThemeIcon variant="light" size={30}>
          <item.icon size="1rem" stroke={1.5} />
        </ThemeIcon>
      }
    >
      {item.links &&
        item.links.map((subItem) => (
          <NavLink
            active={subItem.link === router.pathname}
            variant="filled"
            key={subItem.label}
            label={expanded && subItem.label}
            icon={
              <ThemeIcon variant="light" size={25}>
                <subItem.icon size=".9rem" />
              </ThemeIcon>
            }
            onClick={(e) => {
              e.preventDefault();
              subItem.link && router.push(subItem.link);
            }}
          />
        ))}
    </NavLink>
  );
  return (
    <>
      <Box>
        <Navbar width={expanded ? { base: 200 } : { base: 86 }} height="83%">
          <Burger
            p="lg"
            opened={opened}
            color="gray"
            onClick={handleToggleSidebar}
          />
          <ScrollArea type="scroll" scrollbarSize={4} offsetScrollbars>
            {translatedMockdata.map((item) => renderNavLink(item, false))}
          </ScrollArea>
        </Navbar>
      </Box>
      {expanded ? (
        <Box className="clientNameWrap">
          <Flex>
            <Avatar
              src={null}
              alt="no image here"
              color="gray"
              size="sm"
              mt=".3rem"
              mr="sm"
              radius="md"
            />
            <Text size="sm" mt=".5rem">
              {clientName}
            </Text>
          </Flex>
        </Box>
      ) : null}
    </>
  );
}
