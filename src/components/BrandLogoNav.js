import React, { useContext } from "react";
import { SITE_NAME, SITE_VERSION, ThemeContext } from "../config/config";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  siteNavLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textAlign: "left",
    paddingTop: "3px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  logo: {
    height: "40px", // adjust this size as needed
    objectFit: "contain",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: "1.1rem",
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
      <span className={classes.text} style={{ fontWeight: "normal" }}>
        Powered by:
      </span>
      <img
        src="/topshot-logo-white.png" // place your black/white logo in /public
        alt="Top Shot Prep Logo"
        className={classes.logo}
      />
    </div>
  );
}

export default BrandLogoNav;
