import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ProblemWrapper from "@components/problem-layout/ProblemWrapper.js";
import LessonSelectionWrapper from "@components/problem-layout/LessonSelectionWrapper.js";
import { withRouter } from "react-router-dom";

import {
    coursePlans,
    findLessonById,
    LESSON_PROGRESS_STORAGE_KEY,
    MIDDLEWARE_URL,
    SITE_NAME,
    ThemeContext,
    MASTERY_THRESHOLD,
} from "../config/config.js";
import to from "await-to-js";
import { toast } from "react-toastify";
import ToastID from "../util/toastIds";
import BrandLogoNav from "@components/BrandLogoNav";
import { cleanArray } from "../util/cleanObject";
import ErrorBoundary from "@components/ErrorBoundary";
import { CONTENT_SOURCE } from "@common/global-config";
import withTranslation from '../util/withTranslation';

let problemPool = require(`@generated/processed-content-pool/${CONTENT_SOURCE}.json`);

let seed = Date.now().toString();
console.log("Generated seed");

class Platform extends React.Component {
    static contextType = ThemeContext;

    constructor(props, context) {
        super(props);
        
        this.problemIndex = {
            problems: problemPool,
        };
        this.completedProbs = new Set();
        this.lesson = null;

        this.user = context.user || {};
        console.debug("USER: ", this.user)
        this.isPrivileged = !!this.user.privileged;
        this.context = context;

        // Add each Q Matrix skill model attribute to each step
        for (const problem of this.problemIndex.problems) {
            for (
                let stepIndex = 0;
                stepIndex < problem.steps.length;
                stepIndex++
            ) {
                const step = problem.steps[stepIndex];
                step.knowledgeComponents = cleanArray(
                    context.skillModel[step.id] || []
                );
            }
        }
        if (this.props.lessonID == null) {
            this.state = {
                currProblem: null,
                status: "courseSelection",
                seed: seed,
            };
        } else {
            this.state = {
                currProblem: null,
                status: "courseSelection",
                seed: seed,
            };
        }

        this.selectLesson = this.selectLesson.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        if (this.props.lessonID != null) {
            console.log("calling selectLesson from componentDidMount...") 
            const lesson = findLessonById(this.props.lessonID)
            console.debug("lesson: ", lesson)
            this.selectLesson(lesson).then(
                (_) => {
                    console.debug(
                        "loaded lesson " + this.props.lessonID,
                        this.lesson
                    );
                }
            );

            const { setLanguage } = this.props;
            if (lesson.courseName == 'Matematik 4') {
                setLanguage('se')
            } else {
                const defaultLocale = localStorage.getItem('defaultLocale');
                setLanguage(defaultLocale)
            }
        } else if (this.props.courseNum != null) {
            this.selectCourse(coursePlans[parseInt(this.props.courseNum)]);
        }
        this.onComponentUpdate(null, null, null);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.context.problemID = "n/a";
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.onComponentUpdate(prevProps, prevState, snapshot);
    }

    
    onComponentUpdate(prevProps, prevState, snapshot) {
        if (
            Boolean(this.state.currProblem?.id) &&
            this.context.problemID !== this.state.currProblem.id
        ) {
            this.context.problemID = this.state.currProblem.id;
        }
        if (this.state.status !== "learning") {
            this.context.problemID = "n/a";
        }
    }
    
    async selectLesson(lesson, updateServer=true) {
        const context = this.context;
        if (!this._isMounted) {
            return;
        }
        if (this.isPrivileged) {
            let err, response;
            [err, response] = await to(
                fetch(`${MIDDLEWARE_URL}/setLesson`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: context?.jwt || this.context?.jwt || "",
                        lesson,
                    }),
                })
            );
            if (err || !response) {
                return;
            } else {
                if (response.status !== 200) {
                    return;
                } else {
                    const responseText = await response.text();
                    let [message, ...addInfo] = responseText.split("|");
                    this.props.history.push(
                        `/assignment-already-linked?to=${addInfo.to}`
                    );
                }
            }
        }

        this.lesson = lesson;

        const loadLessonProgress = async () => {
            const { getByKey } = this.context.browserStorage;
            return await getByKey(
                LESSON_PROGRESS_STORAGE_KEY(this.lesson.id)
            ).catch((err) => {});
        };

        const [, prevCompletedProbs] = await Promise.all([
            this.props.loadBktProgress(),
            loadLessonProgress(),
        ]);
        if (!this._isMounted) {
            return;
        }
        if (prevCompletedProbs) {
            this.completedProbs = new Set(prevCompletedProbs);
        }
        this.setState(
            {
                currProblem: this._nextProblem(
                    this.context ? this.context : context
                ),
            },
            () => {}
        );
    }

    selectCourse = (course, context) => {
        this.course = course;
        this.setState({
            status: "lessonSelection",
        });
    };

    _nextProblem = (context) => {
        seed = Date.now().toString();
        this.setState({ seed: seed });
        this.props.saveProgress();
        const problems = this.problemIndex.problems.filter(
            ({ courseName }) => !courseName.toString().startsWith("!!")
        );
        let chosenProblem;

        for (const problem of problems) {
            let probMastery = 1;
            let isRelevant = false;
            for (const step of problem.steps) {
                if (typeof step.knowledgeComponents === "undefined") {
                    continue;
                }
                for (const kc of step.knowledgeComponents) {
                    if (typeof context.bktParams[kc] === "undefined") {
                        continue;
                    }
                    if (kc in this.lesson.learningObjectives) {
                        isRelevant = true;
                    }
                    if (!(kc in context.bktParams)) {
                        continue;
                    }
                    probMastery *= context.bktParams[kc].probMastery;
                }
            }
            if (isRelevant) {
                problem.probMastery = probMastery;
            } else {
                problem.probMastery = null;
            }
        }

        chosenProblem = context.heuristic(problems, this.completedProbs);

        const objectives = Object.keys(this.lesson.learningObjectives);
        let score = objectives.reduce((x, y) => {
            return x + context.bktParams[y].probMastery;
        }, 0);
        score /= objectives.length;
        this.displayMastery(score);

        if (
            !Object.keys(context.bktParams).some(
                (skill) =>
                    context.bktParams[skill].probMastery <= MASTERY_THRESHOLD
            )
        ) {
            this.setState({ status: "graduated" });
            return null;
        } else if (chosenProblem == null) {
            if (this.lesson && !this.lesson.allowRecycle) {
                this.setState({ status: "exhausted" });
                return null;
            } else {
                this.completedProbs = new Set();
                chosenProblem = context.heuristic(
                    problems,
                    this.completedProbs
                );
            }
        }

        if (chosenProblem) {
            this.setState({ currProblem: chosenProblem, status: "learning" });
            this.context.firebase.startedProblem(
                chosenProblem.id,
                chosenProblem.courseName,
                chosenProblem.lesson,
                this.lesson.learningObjectives
            );
            return chosenProblem;
        }
    };

    problemComplete = async (context) => {
        this.completedProbs.add(this.state.currProblem.id);
        const { setByKey } = this.context.browserStorage;
        await setByKey(
            LESSON_PROGRESS_STORAGE_KEY(this.lesson.id),
            this.completedProbs
        ).catch((error) => {
            this.context.firebase.submitSiteLog(
                "site-error",
                `componentName: Platform.js`,
                {
                    errorName: error.name || "n/a",
                    errorCode: error.code || "n/a",
                    errorMsg: error.message || "n/a",
                    errorStack: error.stack || "n/a",
                },
                this.state.currProblem.id
            );
        });
        this._nextProblem(context);
    };

    displayMastery = (mastery) => {
        this.setState({ mastery: mastery });
        if (mastery >= MASTERY_THRESHOLD) {
            toast.success("You've successfully completed this assignment!", {
                toastId: ToastID.successfully_completed_lesson.toString(),
            });
        }
    };

    render() {
        const { translate } = this.props;
        this.studentNameDisplay = this.context.studentName
        ? decodeURIComponent(this.context.studentName) + " | "
        : translate('platform.LoggedIn') + " | ";
        return (
            <div
                style={{
                    backgroundColor: "#F6F6F6",
                    paddingBottom: 20,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <AppBar position="static">
                    <Toolbar style={{ minHeight: "80px" }}> 
                        <Grid
                            container
                            spacing={0}
                            role={"navigation"}
                            alignItems={"center"}
                        >
                            {/* Left: Logo + Title */}
                            <Grid item xs={4} key={1}>
                                <BrandLogoNav
                                    isPrivileged={this.isPrivileged}
                                />
                            </Grid>

                            {/* Center: Lesson title */}
                            <Grid item xs={4} key={2}>
                                <div
                                    style={{
                                        textAlign: "center",
                                        paddingTop: "6px",
                                        fontSize: "1.2rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    {Boolean(
                                        findLessonById(this.props.lessonID)
                                    )
                                        ? findLessonById(this.props.lessonID)
                                              .name +
                                          " " +
                                          findLessonById(this.props.lessonID)
                                              .topics
                                        : ""}
                                </div>
                            </Grid>

                            {/* Right: Mastery / student name */}
                            <Grid item xs={4} key={3}>
                                <div
                                    style={{
                                        textAlign: "right",
                                        paddingTop: "6px",
                                        fontSize: "0.95rem",
                                    }}
                                >
                                    {this.state.status !== "courseSelection" &&
                                    this.state.status !== "lessonSelection" &&
                                    (this.lesson.showStuMastery == null ||
                                        this.lesson.showStuMastery)
                                        ? this.studentNameDisplay +
                                          translate('platform.Mastery') +
                                          Math.round(this.state.mastery * 100) +
                                          "%"
                                        : ""}
                                </div>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                {this.state.status === "courseSelection" ? (
                    <LessonSelectionWrapper
                        selectLesson={this.selectLesson}
                        selectCourse={this.selectCourse}
                        history={this.props.history}
                        removeProgress={this.props.removeProgress}
                    />
                ) : (
                    ""
                )}
                {this.state.status === "lessonSelection" ? (
                    <LessonSelectionWrapper
                        selectLesson={this.selectLesson}
                        removeProgress={this.props.removeProgress}
                        history={this.props.history}
                        courseNum={this.props.courseNum}
                    />
                ) : (
                    ""
                )}
                {this.state.status === "learning" ? (
                    <ErrorBoundary
                        componentName={"Problem"}
                        descriptor={"problem"}
                    >
                        <ProblemWrapper
                            problem={this.state.currProblem}
                            problemComplete={this.problemComplete}
                            lesson={this.lesson}
                            seed={this.state.seed}
                            lessonID={this.props.lessonID}
                            displayMastery={this.displayMastery}
                        />
                    </ErrorBoundary>
                ) : (
                    ""
                )}
                {this.state.status === "exhausted" ? (
                    <center>
                        <h2>
                            Thank you for learning with {SITE_NAME}. You have
                            finished all problems.
                        </h2>
                    </center>
                ) : (
                    ""
                )}
                {this.state.status === "graduated" ? (
                    <center>
                        <h2>
                            Thank you for learning with {SITE_NAME}. You have
                            mastered all the skills for this session!
                        </h2>
                    </center>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default withRouter(withTranslation(Platform));
