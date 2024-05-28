import { IconLogout, IconLogin } from "@tabler/icons-react";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Text, Group, Button, Grid } from "@mantine/core";

import { logout } from "../../../store/auth/authSlice";
import { isLoggedIn } from "../../../utils/account/isLoggedIn";
import AccountLinks from "./AccountLinks";
import classes from "./NavLinksBar.module.css";

function NavLinksBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => isLoggedIn(state));

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => console.log("Logout failed:", error));
  };

  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <AccountLinks />
        </div>
        <div className={classes.footer}>
          {loggedIn ? (
            <Button
              onClick={handleLogout}
              leftSection={<IconLogout size={24} />}
              className={classes.logoutButton}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" className={classes.loginButton}>
              <Button leftSection={<IconLogin size={24} />}>Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavLinksBar;

// import {
//   IconHome,
//   IconUserCircle,
//   IconLogout,
//   IconLayout2,
//   IconLogin,
//   IconPlus,
//   IconArticle,
//   IconSettings,
//   IconBox,
// } from "@tabler/icons-react";

// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { Text, Group, useMantineTheme } from "@mantine/core";
// import classes from "./navbar.module.css";

// import { logout } from "../../../store/auth/authSlice";
// import { isLoggedIn } from "../../../utils/account/isLoggedIn";
// import AccountLinks from "./AccountLinks";

// const navData = [
//   { link: "/", label: "Home", icon: IconHome },
//   { link: "/venues/create", label: "New venue", icon: IconPlus },
//   {
//     link: "/venues",
//     label: "Venues",
//     icon: IconLayout2,
//   },
//   { link: "/profile", label: "Profile", icon: IconUserCircle },
//   { link: "/profile/venues", label: "Your venues", icon: IconBox },
//   { link: "/profiles", label: "All profiles", icon: IconUserCircle },
//   { link: "/signup", label: "Sign up", icon: IconLogin },
//   { link: "/venues", label: "Bookings", icon: IconArticle },
//   { link: "profile/Simonsen/settings", label: "Settings", icon: IconSettings },
// ];

// function NavLinksBar() {
//   const [active, setActive] = useState("Venues");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { name } = useSelector((state) => state.user);
//   const loggedIn = useSelector(isLoggedIn);

//   useEffect(() => {}, [name]);

//   const handleLogout = () => {
//     dispatch(logout())
//       .then(() => {
//         navigate("/");
//       })
//       .catch((error) => {
//         console.log("Logout failed:", error);
//       });
//   };

//   const profileLink = name ? `/profile/${name}` : `/profile`;

//   const links = navData
//     .filter((item) => {
//       if (item.label === "Profile") {
//         return loggedIn;
//       } else if (item.label === "Sign up") {
//         return !loggedIn;
//       }
//       return true;
//     })
//     .map((item) => {
//       const link = item.label === "Profile" ? profileLink : item.link;
//       return (
//         <Link
//           className={classes.link}
//           data-active={item.label === active}
//           to={link}
//           key={item.label}
//           onClick={() => {
//             setActive(item.label);
//           }}
//         >
//           <item.icon className={classes.linkIcon} stroke={1.5} /> {item.label}
//         </Link>
//       );
//     });

//   return (
//     <>
//       <nav className={classes.navbar}>
//         <div className={classes.navbarMain}>{links}</div>
//         <div className={classes.footer}>
//           {loggedIn ? (
//             <button onClick={handleLogout} className={classes.logoutButton}>
//               <IconLogout className={classes.linkIcon} stroke={1.5} />
//               <Text>Logout</Text>
//             </button>
//           ) : (
//             <Link to="/login" className={classes.loginButton}>
//               <IconLogin className={classes.linkIcon} stroke={1.5} />
//               <Text>Login</Text>
//             </Link>
//           )}
//         </div>
//       </nav>
//     </>
//   );
// }

// export default NavLinksBar;
