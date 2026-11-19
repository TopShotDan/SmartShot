import React from "react";
import Spacer from "@components/Spacer";
import { useStyles } from "./Posts";
import { HELP_DOCUMENT, SITE_NAME } from "../../config/config";

const VPAT_LINK = `${process.env.PUBLIC_URL}/static/documents/OATutor_Sec508_WCAG.pdf`

const About = () => {
    const classes = useStyles()
    const currentYear = new Date().getFullYear();

    return <>
        <h2>
            About {SITE_NAME}
        </h2>
        {SITE_NAME} is a free practice tool from <a href="https://topshotprep.com" target={"_blank"} rel={"noreferrer"}>Top Shot Prep</a>.
        It is built on OATutor (Open Adaptive Tutor), an open-source adaptive tutoring system based on Intelligent Tutoring System (ITS) principles.
        {SITE_NAME} is an independent project and is not affiliated with or endorsed by UC Berkeley or the CAHL Research Lab.
        <h3>Question Input Types & Shortcuts</h3>

        To learn more about how to fill in and submit assignments,<span> </span>
        <a href={HELP_DOCUMENT} target={"_blank"} rel={"noreferrer"}>visit our help document</a>.

        <h3>Credits</h3>

        OATutor was created and developed by a dedicated team from the Computational Approaches to Human Learning (CAHL) Research Lab at the UC Berkeley School of Education.
        Practice problems are adapted from <a href="https://openstax.org/" target={"_blank"} rel={"noreferrer"}>OpenStax</a> textbooks, with hints and scaffolds authored by the OATutor Project.

        <h3>Learn more about OATutor</h3>
        <ul>
            <li>Visit <a href="https://www.oatutor.io/" target={"_blank"} rel={"noreferrer"}>https://www.oatutor.io/</a> to explore more about OATutor.</li>
            <li>Read the <a href="https://dl.acm.org/doi/10.1145/3544548.3581574" target={"_blank"} rel={"noreferrer"}>OATutor research paper</a> to learn more about the scientific foundation and methodology behind it.</li>
        </ul>

        <h3>Accessibility Standards</h3>

        <p className={classes["pt-2"]}>
            The original OATutor platform was evaluated for Section 508 / WCAG conformance. You may read the OATutor
            Voluntary Product Accessibility Template (VPAT) at this url:<span> </span>
            <a href={VPAT_LINK} target={"_blank"} rel={"noreferrer"}>{VPAT_LINK.match(/\/[^/]*$/)[0].substr(1)}</a>
        </p>

        <Spacer height={24 * 1}/>

        <sub>
            <p>OATutor code is licensed under the MIT Open Source License, with its adaptive learning content made available under a CC BY 4.0 license.</p>
            <p>OATutor © 2023, Zachary A. Pardos, CAHL Research Lab, UC Berkeley School of Education.</p>
            <p>{SITE_NAME} changes © {currentYear} Top Shot Prep.</p>
        </sub>
    </>
}

export default About
