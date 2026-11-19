import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from './common-styles.js';
import IconButton from '@material-ui/core/IconButton';
import { _coursePlansNoEditor, ThemeContext, SITE_NAME, SHOW_COPYRIGHT } from '../../config/config.js';
import { isFullChatLesson } from '../../util/officeHours.js';
import Spacer from "../Spacer";
import { Typography } from "@material-ui/core";
import { IS_STAGING_OR_DEVELOPMENT } from "../../util/getBuildType";
import BuildTimeIndicator from "@components/BuildTimeIndicator";
import withTranslation from "../../util/withTranslation.js";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { LocalizationConsumer } from '../../util/LocalizationContext';
import { withResponsive } from '../../util/ResponsiveContext';
import { FEATURED_COURSES, getCourseInfo } from '../../config/smartshotCourses.js';

// Activate a card with the mouse or the keyboard (Enter / Space).
const onActivate = (fn) => ({
    onClick: fn,
    onKeyDown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fn();
        }
    },
});

class LessonSelection extends React.Component {
    static contextType = ThemeContext;

    constructor(props, context) {
        super(props);

        this.user = context.user || {}
        this.isPrivileged = !!this.user.privileged

        this.coursePlans = _coursePlansNoEditor;

        this.state = {
            preparedRemoveProgress: false,
            removedProgress: false,
            showAllCourses: false,
        }
    }

    removeProgress = () => {
        this.setState({ removedProgress: true });
        this.props.removeProgress();
    }

    prepareRemoveProgress = () => {
        this.setState({ preparedRemoveProgress: true });
    }

    openCourse = (course, courseIndex) => {
        this.props.selectCourse(course);
        this.props.history.push(`/courses/${courseIndex}`);
    };

    renderCourseCard = (course, courseIndex) => {
        const { classes } = this.props;
        const info = getCourseInfo(course);
        const lessonCount = (course.lessons || []).length;
        const open = () => this.openCourse(course, courseIndex);

        return (
            <Grid item xs={12} sm={6} md={3} key={course.courseName}>
                <Paper className={classes.smartCard} elevation={0}
                       role="link" tabIndex={0} aria-label={`Open ${info.displayName}`}
                       {...onActivate(open)}>
                    <div className={classes.smartCardStrip} style={{ backgroundColor: info.color }} />
                    <div className={classes.smartCardBody}>
                        <h2 className={classes.smartCardTitle}>{info.displayName}</h2>
                        {info.description && <div className={classes.smartCardText}>{info.description}</div>}
                        <div className={classes.smartCardMeta}>
                            {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
                        </div>
                    </div>
                    <div className={classes.smartCardActions}>
                        <Button variant="contained" color="primary" className={classes.smartCardButton}
                                startIcon={<PlayArrowIcon />} tabIndex={-1}
                                onClick={(e) => { e.stopPropagation(); open(); }}>
                            Start practicing
                        </Button>
                    </div>
                </Paper>
            </Grid>
        );
    };

    renderLessonCard = (lesson, key, subtitle, showProblemsLink = true) => {
        const { classes, history } = this.props;
        const open = () => history.push(`/lessons/${lesson.id}`);

        return (
            <Grid item xs={12} sm={6} md={4} key={key}>
                <Paper className={classes.smartCard} elevation={0}
                       role="link" tabIndex={0} aria-label={`Start ${lesson.name || lesson.id}`}
                       {...onActivate(open)}>
                    <div className={classes.smartCardStrip} style={{ backgroundColor: '#FFD900' }} />
                    {showProblemsLink && !isFullChatLesson(lesson) && (
                        <IconButton
                            size="small"
                            className={classes.smartCardCorner}
                            aria-label={`View all problems for lesson ${lesson.id}`}
                            title="View all problems"
                            onClick={(e) => {
                                e.stopPropagation();
                                history.push(`/lessons/${lesson.id}/problems`);
                            }}
                        >
                            <MenuBookIcon fontSize="small" />
                        </IconButton>
                    )}
                    <div className={classes.smartCardBody}>
                        <h3 className={classes.smartCardTitle}>{(lesson.name || lesson.id).replace(/##/g, "")}</h3>
                        <div className={classes.smartCardText}>{subtitle}</div>
                    </div>
                    <div className={classes.smartCardActions}>
                        <Button variant="contained" color="primary" className={classes.smartCardButton}
                                startIcon={<PlayArrowIcon />} tabIndex={-1}
                                onClick={(e) => { e.stopPropagation(); open(); }}>
                            Start lesson
                        </Button>
                    </div>
                </Paper>
            </Grid>
        );
    };

    renderCourses() {
        const { classes, translate } = this.props;
        const indexed = this.coursePlans.map((course, i) => ({ course, i }));
        const featured = FEATURED_COURSES
            .map((f) => indexed.find(({ course }) => course.courseName === f.courseName))
            .filter(Boolean);
        const others = indexed.filter(({ course }) => !featured.some((f) => f.course === course));
        // If none of the featured courses exist, show everything.
        const main = featured.length > 0 ? featured : indexed;

        return <>
            <div className={classes.pageHeader}>
                <h1 className={classes.pageTitle}>
                    {this.isPrivileged
                        ? translate('lessonSelection.welcomeInstructor')
                        : `${translate('lessonSelection.welcomeTo')} ${SITE_NAME}!`}
                </h1>
                <div className={classes.pageSubtitle}>
                    Choose a course to start practicing. Hints and step-by-step help are built in.
                </div>
                {this.isPrivileged && <h4>(for {this.user.resource_link_title})</h4>}
                {IS_STAGING_OR_DEVELOPMENT && <BuildTimeIndicator/>}
            </div>

            <Grid container spacing={3}>
                {main.map(({ course, i }) => this.renderCourseCard(course, i))}
            </Grid>

            {featured.length > 0 && others.length > 0 && <>
                <Box mt={4} textAlign="center">
                    <button type="button" className={classes.textLink}
                            aria-expanded={this.state.showAllCourses}
                            onClick={() => this.setState((s) => ({ showAllCourses: !s.showAllCourses }))}>
                        {this.state.showAllCourses ? 'Hide other courses' : `Browse all courses (${others.length} more)`}
                    </button>
                </Box>
                {this.state.showAllCourses && <>
                    <div className={classes.sectionLabel}>More courses</div>
                    <Grid container spacing={3}>
                        {others.map(({ course, i }) => this.renderCourseCard(course, i))}
                    </Grid>
                </>}
            </>}
        </>;
    }

    renderLessons() {
        const { classes, courseNum, history } = this.props;
        const course = this.coursePlans[courseNum];
        const info = getCourseInfo(course);
        const metaLessons = Array.isArray(course.metaLessons) ? course.metaLessons : [];

        const metaLessonChildIds = new Set();
        metaLessons.forEach((m) => {
            (Array.isArray(m.lessons) ? m.lessons : []).forEach((childId) => metaLessonChildIds.add(childId));
        });

        // Students should only reach A/B variants through the meta-lesson, which
        // handles branch assignment. Selecting a variant directly would bypass it.
        // Lessons not referenced by any meta-lesson still show normally.
        const visibleLessons = course.lessons.filter(
            (lesson) => !metaLessonChildIds.has(lesson.metaId) && !metaLessonChildIds.has(lesson.id)
        );

        return <>
            <div className={classes.pageHeader}>
                <Button variant="text" color="primary" size="small" startIcon={<ArrowBackIcon />}
                        onClick={() => history.push('/')}
                        style={{ marginBottom: 12, marginLeft: -8, boxShadow: 'none', height: 32 }}>
                    All courses
                </Button>
                <h1 className={classes.pageTitle}>{info.displayName}</h1>
                <div className={classes.pageSubtitle}>
                    {visibleLessons.length} {visibleLessons.length === 1 ? 'lesson' : 'lessons'}
                    {info.description ? ` · ${info.description}` : ''}
                </div>
                {IS_STAGING_OR_DEVELOPMENT && <BuildTimeIndicator/>}
            </div>

            <Grid container spacing={3}>
                {visibleLessons.map((lesson, i) => this.renderLessonCard(lesson, i, lesson.topics))}
            </Grid>

            {metaLessons.length > 0 && <Fragment>
                <div className={classes.sectionLabel}>Meta lessons</div>
                <Grid container spacing={3}>
                    {metaLessons.map((metaLesson) =>
                        this.renderLessonCard(
                            { id: metaLesson.id, name: metaLesson.name || metaLesson.id },
                            metaLesson.id,
                            'Meta lesson',
                            false
                        )
                    )}
                </Grid>
            </Fragment>}
        </>;
    }

    render() {
        const { translate } = this.props;
        const { classes, courseNum } = this.props;
        const isMobile = this.props.responsive?.isMobile ?? false;
        const selectionMode = courseNum == null ? "course" : "lesson"

        if (selectionMode === "lesson" && courseNum >= this.coursePlans.length) {
            return <Box width={'100%'} textAlign={'center'} pt={4} pb={4}>
                <Typography variant={'h3'}>Course <code>{courseNum}</code> is not valid!</Typography>
            </Box>
        }

        return (
            <>
                <Box display="flex" justifyContent="center" style={{ backgroundColor: '#FFF7D8' }}>
                    <Box width="100%" maxWidth={1200} px={isMobile ? 2 : 4} role={"main"}>
                        {selectionMode === "course" ? this.renderCourses() : this.renderLessons()}

                        <Spacer/>
                        {!this.isPrivileged && (
                            <Box mt={4} textAlign="center">
                                <button
                                    type="button"
                                    className={classes.textLink}
                                    style={{ color: '#7A8A82', fontWeight: 500, fontSize: '0.85rem' }}
                                    onClick={this.state.preparedRemoveProgress ? this.removeProgress : this.prepareRemoveProgress}
                                    disabled={this.state.removedProgress}
                                >
                                    {this.state.removedProgress
                                        ? translate('lessonSelection.reset')
                                        : this.state.preparedRemoveProgress
                                            ? translate('lessonSelection.aresure')
                                            : translate('lessonSelection.resetprogress')}
                                </button>
                            </Box>
                        )}
                        <Spacer/>
                    </Box>
                </Box>

                <footer>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <div style={{ marginLeft: 20, fontSize: 16 }}>
                            {SHOW_COPYRIGHT && <>© {new Date().getFullYear()} {SITE_NAME}</>}
                        </div>
                    </div>
                </footer>
            </>
        )
    }
}

export default withStyles(styles)(withResponsive(withTranslation((props) => (
    <LocalizationConsumer>
        {({ language, platformLanguage }) => (
            <LessonSelection
                {...props}
                language={language}
                platformLanguage={platformLanguage}
            />
        )}
    </LocalizationConsumer>
))));
