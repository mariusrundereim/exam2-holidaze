import {
  IconHome,
  IconUserCircle,
  IconLogout,
  IconLayout2,
  IconLogin,
} from "@tabler/icons-react";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Text, Group } from "@mantine/core";
import classes from "./navbarclass.module.css";

import { logout } from "../../../store/auth/authSlice";

import { isLoggedIn } from "../../../utils/account/isLoggedIn";
const navData = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/explore", label: "Explore", icon: IconLayout2 },
  { link: "/profiles", label: "Profile", icon: IconUserCircle },
  { link: "/signup", label: "Sign up", icon: IconLogin },
];

function NavLinksBar() {
  const [active, setActive] = useState("Explore");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.user);
  const loggedIn = useSelector(isLoggedIn);

  useEffect(() => {}, [name]);

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        navigate("/"); // Navigate after the promise resolves
      })
      .catch((error) => {
        console.log("Logout failed:", error);
      });
  };

  // const handleLogout = () => {
  //   dispatch(logout());
  //   dispatch(resetProfileData());
  // };

  const profileLink = name ? `/profiles/${name}` : `/profiles`;

  const links = navData
    .filter((item) => {
      if (item.label === "Profile") {
        return loggedIn;
      } else if (item.label === "Sign up") {
        return !loggedIn;
      }
      return true;
    })
    .map((item) => {
      const link = item.label === "Profile" ? profileLink : item.link;
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

  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>{links}</div>
        <div className={classes.footer}>
          {loggedIn ? (
            <button onClick={handleLogout} className={classes.logoutButton}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <Text>Logout</Text>
            </button>
          ) : (
            <Link to="/login" className={classes.loginButton}>
              <IconLogin className={classes.linkIcon} stroke={1.5} />
              <Text>Login</Text>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavLinksBar;
