import React, { useContext } from "react";
import { ThemeContext, SITE_NAME } from "../config/config";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import logoSrc from "../assets/LogoCrest.png";

// SmartShot banner logo: crest + name + "Powered by OATutor", made for the green top bar.
const useStyles = makeStyles({
    brand: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        textAlign: "left",
        flexShrink: 0,
    },
    link: {
        "&:hover": { cursor: "pointer" },
        "&:focus-visible": { outline: "2px solid #FFD900", outlineOffset: 4, borderRadius: 6 },
    },
    logo: {
        height: 44,
        display: "block",
    },
    titleBlock: {
        display: "flex",
        flexDirection: "column",
        lineHeight: 1.1,
    },
    name: {
        color: "#FFFFFF",
        fontFamily: "Titillium Web, Inter, Arial, sans-serif",
        fontWeight: 700,
        fontSize: "1.35rem",
        letterSpacing: "0.01em",
    },
    subtitle: {
        color: "rgba(255, 255, 255, 0.72)",
        fontFamily: "Inter, Arial, sans-serif",
        fontWeight: 400,
        fontSize: "0.7rem",
        marginTop: 2,
    },
    "@media (max-width: 600px)": {
        logo: { height: 36 },
        name: { fontSize: "1.1rem" },
        subtitle: { display: "none" },
    },
});

function BrandLogoNav({ isPrivileged = false, noLink = false }) {
    const context = useContext(ThemeContext)
    const history = useHistory()
    const classes = useStyles()

    const navigateLink = (evt) => {
        if (evt.type === "click" || evt.key === "Enter") {
            history.push("/")
        }
    }

    const content = <>
        <img src={logoSrc} alt="" className={classes.logo} />
        <div className={classes.titleBlock}>
            <span className={classes.name}>{SITE_NAME}</span>
            <span className={classes.subtitle}>Powered by OATutor</span>
        </div>
    </>

    // specified to not link, or launched from an LMS as a student
    if (noLink || (context.jwt.length !== 0 && !isPrivileged)) {
        return <div className={classes.brand} style={{ paddingLeft: 12 }}>{content}</div>
    }

    return <div role={"link"} tabIndex={0} aria-label={`${SITE_NAME} home`}
                onClick={navigateLink} onKeyDown={navigateLink}
                className={`${classes.brand} ${classes.link}`}>
        {content}
    </div>
}

export default BrandLogoNav
