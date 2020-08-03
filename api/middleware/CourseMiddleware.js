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

        if (percentageSum != 100) {
            errors.push('The grade percentages must sum to 100.');
        }

        return errors;
    },

    createCourse: async function(courseData, userId) {
        // Create the course
        let course = await Course.createCourse({
            courseName: courseData.courseName,
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

};