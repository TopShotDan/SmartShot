import React, { useContext } from "react";
import { SITE_NAME, SITE_VERSION, ThemeContext } from "../config/config";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  siteNavLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 16px",   // more breathing room
    minHeight: "64px",     // makes the banner taller
    flexWrap: "wrap",
    "&:hover": {
      cursor: "pointer",
    },
  },
  logo: {
    height: "50px",        // was 40px → now bigger
    objectFit: "contain",
  },
  text: {
    color: "white",
    fontFamily: "Titillium Web, Arial, sans-serif", // match your global font
    fontWeight: 600,
    fontSize: "1.3rem",    // slightly bigger
  },
  powered: {
    color: "white",
    fontFamily: "Titillium Web, Arial, sans-serif",
    fontWeight: 400,
    fontSize: "1rem",
  },
});

function BrandLogoNav({ isPrivileged = false, noLink = false }) {
  const context = useContext(ThemeContext);
  const history = useHistory();

  const classes = useStyles();

  const navigateLink = (evt) => {
    if (evt.type === "click" || evt.key === "Enter") {
      history.push("/");
    }
  };

  return (
    <div
      role="link"
  tabIndex={0}
  onClick={navigateLink}
  onKeyDown={navigateLink}
  className={classes.siteNavLink}
>
  <span className={classes.text}>Smart Shot</span>
  <span className={classes.powered}>Powered by:</span>
  <img
    src="/topshot-logo-white.png"
    alt="Top Shot Prep Logo"
    className={classes.logo}
  />
</div>
  );
}

export default BrandLogoNav;
