// SmartShot: courses featured on the home page, with friendlier names.
// `courseName` must match the course's name in content-sources/oatutor/coursePlans.json.
export const FEATURED_COURSES = [
    { courseName: 'OpenStax: Elementary Algebra', displayName: 'Algebra Fundamentals',
      description: 'Master the building blocks of algebra.', color: '#FFD900' },
    { courseName: 'OpenStax: Pre-Calculus', displayName: 'Pre-Calculus',
      description: 'Prepare for calculus with essential concepts.', color: '#E4F0DD' },
    { courseName: 'OpenStax: Introductory Stats', displayName: 'Statistics',
      description: 'Learn to analyze and interpret data.', color: '#DCEEF0' },
    { courseName: 'OpenStax: Calculus Volume 1', displayName: 'Calculus',
      description: 'Explore limits, derivatives, and integrals.', color: '#124D36' },
];

// Card strip colors sit on the muted-teal card, so they must contrast with #1F7580.
const OTHER_COURSE_COLOR = '#DCEEF0';

export const getCourseInfo = (course) =>
    FEATURED_COURSES.find((f) => f.courseName === course?.courseName) || {
        displayName: course?.courseName,
        description: null,
        color: OTHER_COURSE_COLOR,
    };

export const getCourseDisplayName = (courseName) =>
    FEATURED_COURSES.find((f) => f.courseName === courseName)?.displayName || courseName;
