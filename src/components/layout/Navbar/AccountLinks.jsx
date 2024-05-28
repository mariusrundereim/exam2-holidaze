import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  IconHome,
  IconUserCircle,
  IconLayout2,
  IconLogin,
  IconPlus,
  IconArticle,
  IconSettings,
  IconBox,
  IconUserPlus,
} from "@tabler/icons-react";
import { Stack } from "@mantine/core";
import classes from "./AccountLinks.module.css";

export const isLoggedIn = (state) => Boolean(state.auth.accessToken);

const notLoggedInLinks = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/venues", label: "Venues", icon: IconLayout2 },
  { link: "/signup", label: "Sign Up", icon: IconLogin },
  { link: "/login", label: "Login", icon: IconLogin },
  { link: "/register", label: "Register", icon: IconUserPlus },
];

const venueManagerLinks = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/venues", label: "Venues", icon: IconLayout2 },
  { link: "/profile", label: "Dashboard", icon: IconUserCircle },
  { link: "/profile/venues", label: "Your venues", icon: IconBox },
  { link: "/venues/create", label: "Create venue", icon: IconPlus },
  { link: "/profile/bookings", label: "Your bookings", icon: IconArticle },
  { link: "/profile/settings", label: "Settings", icon: IconSettings },
];

const customerLinks = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/venues", label: "Venues", icon: IconLayout2 },
  { link: "/profile", label: "Dashboard", icon: IconUserCircle },
  { link: "/profile/bookings", label: "Your bookings", icon: IconArticle },
  { link: "/profile/settings", label: "Settings", icon: IconSettings },
];

function AccountLinks() {
  const { name } = useSelector((state) => state.user);
  const venueManager = useSelector((state) => state.profile.venueManager);
  const loggedIn = useSelector((state) => Boolean(state.auth.accessToken));
  let links;

  if (!loggedIn) {
    links = notLoggedInLinks;
  } else if (venueManager) {
    links = venueManagerLinks;
  } else {
    links = customerLinks;
  }

  return (
    <>
      <Stack>
        {links.map((item) => {
          const link =
            item.link.includes("profile") && name
              ? item.link.replace("profile", `profile/${name}`)
              : item.link;
          return (
            <Link to={link} key={item.label} className={classes.link}>
              <item.icon className={classes.linkIcon} /> {item.label}
            </Link>
          );
        })}
      </Stack>
    </>
  );
}

export default AccountLinks;
