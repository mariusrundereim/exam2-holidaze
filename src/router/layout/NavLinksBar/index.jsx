import {
  IconHome,
  IconUserCircle,
  IconLogout,
  IconLayout2,
  IconLogin,
} from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Text } from "@mantine/core";
import classes from "./navbarclass.module.css";

const navData = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/explore", label: "Explore", icon: IconLayout2 },
  { link: "/profiles", label: "Profile", icon: IconUserCircle },
  { link: "/signup", label: "Sign up", icon: IconLogin },
];

// Split

function NavLinksBar() {
  const [active, setActive] = useState("Explore");
  const { venueManager, name } = useSelector((state) => state.user);
  const isLoggedIn = Boolean(name);

  const links = navData
    .filter((item) => item.label !== "Profile" || isLoggedIn)
    .map((item) => {
      const link = item.label === "Profile" ? `/profiles/${name}` : item.link;
      return (
        <Link
          className={classes.link}
          data-active={item.label === active}
          to={link}
          key={item.label}
          onClick={() => {
            setActive(item.label);
          }}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} /> {item.label}
        </Link>
      );
    });

  // const links = navData.map((item) => (
  //   <Link
  //     className={classes.link}
  //     data-active={item.label === active}
  //     to={item.link}
  //     key={item.label}
  //     onClick={() => {
  //       setActive(item.label);
  //     }}
  //   >
  //     <item.icon className={classes.linkIcon} stroke={1.5} /> {item.label}
  //   </Link>
  // ));

  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>{links}</div>
        <div className={classes.footer}>
          <Link>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <Text>Logout</Text>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default NavLinksBar;
