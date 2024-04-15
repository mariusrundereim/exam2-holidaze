import { Outlet } from "react-router-dom";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Layout;
