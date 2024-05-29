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
              <Button leftSection={<IconLogin size={24} />} fullWidth>
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavLinksBar;
