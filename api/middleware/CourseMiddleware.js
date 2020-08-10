const Course = require("../models/Course");
const GradeComponent = require("../models/GradeComponent");
const GradeComponentMiddleware = require("./GradeComponentMiddleware");

module.exports = {

    validateNewCourse: async function(courseData) {
        let errors = [];

        if (!courseData.courseName) {
            errors.push('Please enter a course name.');
        }

        let percentageSum = 0;
        for (let i = 0; i < courseData.gradeComponents.length; i++) {
            let componentData = courseData.gradeComponents[i];
            let componentErrors = await GradeComponentMiddleware.validateNewGradeComponent(componentData);
            if (componentErrors && componentErrors.length > 0) {
                errors = errors.concat(componentErrors);
            }
            percentageSum += parseInt(componentData.gradePercentage);
        }

        if (percentageSum !== 100) {
            errors.push('The grade percentages must sum to 100.');
        }

        if (!courseData.startDate) {
            errors.push('Please select a start date for the course.');
        }

        if (!courseData.endDate) {
            errors.push('Please select an end date for the course.');
        }

        return errors;
    },

    createCourse: async function(courseData, userId) {
        // Create the course
        let course = await Course.createCourse({
            courseName: courseData.courseName,
            startDate: courseData.startDate,
            endDate: courseData.endDate,
            user: userId
        });

        // Create the course's GradeComponents
        for (let i = 0; i < courseData.gradeComponents.length; i++) {
            let componentData = courseData.gradeComponents[i];
            await GradeComponent.createGradeComponent({
                componentName: componentData.componentName,
                gradePercentage: componentData.gradePercentage,
                course: course.id
            });
        }

        return course;
    },

    validateEditCourse: async function(courseData) {
        let errors = [];

        if (!courseData.courseName) {
            errors.push('Please enter a name for the course.');
        }

        return errors;
    },

    updateCourse: async function(courseData, courseId) {
        let course = await Course.updateCourse(courseData, courseId)

        return course;
    }

};
