// SmartShot: courses featured on the home page, with friendlier names.
// `courseName` must match the course's name in content-sources/oatutor/coursePlans.json.
export const FEATURED_COURSES = [
    { courseName: 'OpenStax: Elementary Algebra', displayName: 'Algebra Fundamentals',
      description: 'Master the building blocks of algebra.', color: '#FFD900' },
    { courseName: 'OpenStax: Pre-Calculus', displayName: 'Pre-Calculus',
      description: 'Prepare for calculus with essential concepts.', color: '#034455' },
    { courseName: 'OpenStax: Introductory Stats', displayName: 'Statistics',
      description: 'Learn to analyze and interpret data.', color: '#1F7580' },
    { courseName: 'OpenStax: Calculus Volume 1', displayName: 'Calculus',
      description: 'Explore limits, derivatives, and integrals.', color: '#124D36' },
];

// Card strip colors sit on the soft-blue card (#DCEEF0), so they must contrast with it.
const OTHER_COURSE_COLOR = '#1F7580';

export const getCourseInfo = (course) =>
    FEATURED_COURSES.find((f) => f.courseName === course?.courseName) || {
        displayName: course?.courseName,
        description: null,
        color: OTHER_COURSE_COLOR,
    };

export const getCourseDisplayName = (courseName) =>
    FEATURED_COURSES.find((f) => f.courseName === courseName)?.displayName || courseName;
