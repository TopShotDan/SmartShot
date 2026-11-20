const styles = theme => ({
    card: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 32,
    },
    hintCard: {
        width: '40em',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            maxWidth: '100%',
        },
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 10,
        paddingRight: 10,
        width: "20%",
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },

    stepHeader: {
        //textAlign: 'center',
        fontSize: 20,
        marginTop: 0,
        marginBottom: 20
        //marginLeft: 10
    },

    stepBody: {
        //textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10
    },

    inputField: {
        width: '100%',
        textAlign: 'center',
        //marginLeft: '19em'

    },

    muiUsedHint: {
        borderWidth: '1px',
        borderColor: 'GoldenRod !important'
    },

    inputHintField: {
        width: '10em',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },

    center: {
        marginLeft: '19em',
        marginRight: '19em',
        marginTop: '1em',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 16,
            marginRight: 16,
        },
    },

    checkImage: {
        width: '3em',
        marginLeft: '0.5em',
    },

    hintCheckImage: {
        width: 32,
        height: 32,
        marginLeft: '0.3em',
        [theme.breakpoints.up('sm')]: {
            width: 32,
            height: 32,
            marginLeft: 22,
        },
    },

    root: {
        flexGrow: 1,
    },

    paper: {
        padding: theme.spacing(2, 2),
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.08)",
    },

    // SmartShot course & lesson cards (based on the earlier SmartShot design)
    pageHeader: {
        padding: theme.spacing(5, 0, 3),
        [theme.breakpoints.down('xs')]: { padding: theme.spacing(3, 0, 2) },
    },
    // Brand: forest #124D36, teal #1F7580, gold #FFD900, cream #FFF7D8, deep #034455, ink #0A1F17
    pageTitle: {
        fontWeight: 700,
        fontSize: '2rem',
        color: '#0A1F17',
        margin: 0,
        [theme.breakpoints.down('xs')]: { fontSize: '1.6rem' },
    },
    pageSubtitle: {
        color: '#3F5248',
        fontSize: '1.05rem',
        marginTop: theme.spacing(1),
    },
    sectionLabel: {
        fontWeight: 600,
        fontSize: '0.8rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#3F5248',
        margin: theme.spacing(4, 0, 2),
    },
    smartCard: {
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        overflow: 'hidden',
        backgroundColor: '#DCEEF0',
        border: '1px solid #C3DFE3',
        borderRadius: 16,
        boxShadow: '0 2px 6px rgba(3, 68, 85, 0.10)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
        '&:hover': {
            transform: 'translateY(-4px)',
            backgroundColor: '#D2E8EB',
            boxShadow: '0 14px 28px rgba(3, 68, 85, 0.18)',
        },
        '&:focus-visible': {
            outline: '3px solid #1F7580',
            outlineOffset: 2,
        },
    },
    smartCardStrip: {
        height: 6,
        width: '100%',
        flexShrink: 0,
    },
    smartCardBody: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3, 3, 1),
    },
    smartCardTitle: {
        fontWeight: 700,
        fontSize: '1.2rem',
        lineHeight: 1.3,
        color: '#0A1F17',
        margin: 0,
        paddingRight: theme.spacing(4),
    },
    smartCardText: {
        color: '#2F4A47',
        fontSize: '0.92rem',
        lineHeight: 1.5,
        marginTop: theme.spacing(1),
        flexGrow: 1,
    },
    smartCardMeta: {
        color: '#1F7580',
        fontSize: '0.8rem',
        fontWeight: 600,
        marginTop: theme.spacing(2),
    },
    smartCardActions: {
        padding: theme.spacing(2, 3, 3),
    },
    smartCardButton: {
        width: '100%',
        borderRadius: 10,
        textTransform: 'none',
        fontWeight: 700,
        // doubled selector so it wins over the theme's green button style
        '&&': {
            backgroundColor: '#FFD900',
            color: '#0A1F17',
            boxShadow: 'none',
        },
        '&&:hover': {
            backgroundColor: '#F2CC00',
            boxShadow: 'none',
        },
    },
    smartCardCorner: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(1),
        color: '#1F7580',
        '&:hover': { backgroundColor: 'rgba(31, 117, 128, 0.12)' },
    },
    textLink: {
        background: 'none',
        border: 'none',
        padding: 0,
        color: '#1F7580',
        fontWeight: 600,
        fontSize: '0.95rem',
        cursor: 'pointer',
        '&:hover': { textDecoration: 'underline' },
    },

    // Problem
    prompt: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 20,
        marginBottom: 32,
        textAlign: 'left',
        fontSize: 20,
        fontFamily: 'Titillium Web, Inter, sans-serif',
    },
    titleCard: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
    },
    problemHeader: {
        fontSize: 22,
        fontWeight: 700,
        marginTop: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        [theme.breakpoints.down('xs')]: {
            fontSize: 18,
        },
    },
    problemBody: {
        fontSize: 18,
        marginTop: 0,
        [theme.breakpoints.down('xs')]: {
            fontSize: 16,
        },
    },
    problemStepHeader: {
        fontSize: 25,
        marginTop: 0,
        marginLeft: 10
    },
    problemStepBody: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10
    },
    textBox: {
        paddingLeft: 70,
        paddingRight: 70,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 16,
            paddingRight: 16,
        },
    },
    textBoxHeader: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    textBoxLatex: {
        border: "1px solid #c4c4c4",
        borderRadius: "4px",
        '&:hover': {
            border: "1px solid #000000",
        },
        '&:focus-within': {
            border: "2px solid #1F7580",
        },
        height: 50,
        width: '100%',
        '& > .mq-editable-field': {
            display: 'table',
            tableLayout: 'fixed'
        },
        '& > * > *[mathquill-block-id]': {
            height: 50,
            display: 'table-cell',
            paddingBottom: 5
        }
    },
    textBoxLatexIncorrect: {
        boxShadow: "0 0 0.75pt 0.75pt red",
        '&:focus-within': {
            border: "1px solid red",
        },
    },
    textBoxLatexUsedHint: {
        boxShadow: "0 0 0.75pt 0.75pt GoldenRod",
        '&:focus-within': {
            border: "1px solid GoldenRod",
        },
    },


    toolbarOffset: theme.mixins.toolbar,

    secondBarOffset: {
        top: 56,
        [theme.breakpoints.up("sm")]: {
            top: 64,
        },
        position: 'fixed',
        zIndex: theme.zIndex.appBar,
    },

    drawerPaper: {
        top: 112,
        height: 'calc(100vh - 112px)',
        [theme.breakpoints.up('sm')]: {
            top: 120,
            height: 'calc(100vh - 120px)',
        },
        zIndex: theme.zIndex.drawer,
    },
    drawerPaperMobile: {
        top: 56,
        height: 'calc(100vh - 56px)',
        zIndex: theme.zIndex.drawer + 1,
    },
    mobileCompactToolbar: {
        minHeight: 48,
        paddingLeft: 4,
        paddingRight: 4,
    },
    mobileCourseTitle: {
        fontWeight: 600,
        fontSize: 14,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        minWidth: 0,
    },

    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    }
});

export default styles;
