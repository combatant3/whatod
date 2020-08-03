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
            let err = await GradeComponentMiddleware.validateNewGradeComponent(componentData);
            if (err && err.length > 0) {
                errors.push('There is an error in one or more of your grade components.');
                break;
            }
            percentageSum += componentData.gradePercentage;
        }

        if (percentageSum != 100) {
            errors.push('The grade percentages must sum to 100.');
        }

        for (let i = 0; i < courseData.assignments.length; i++) {
            let assignmentData = courseData.assignments[i];
            let err = await AssignmentMiddleware.validateNewAssignment(assignmentData);
            if (err && err.length > 0) {
                errors.push('There is an error in one or more of your assignments.');
                break;
            }
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
        let gradeComponentUuidToId = {}; // Map to associate the componet UUID to its new ID
        for (let i = 0; i < courseData.gradeComponents.length; i++) {
            let componentData = courseData.gradeComponents[i];
            let gradeComponent = await GradeComponent.createGradeComponent({
                componentName: componentData.componentName,
                gradePercentage: componentData.gradePercentage,
                course: course.id
            });
            gradeComponentUuidToId[componentData.uuid] = gradeComponent.id;
        }

        // Create the course's assignments
        for (let i = 0; i < courseData.assignments.length; i++) {
            let assignmentData = courseData.assignments[i];
            await Assignment.createAssignment({
                assignmentTitle: assignmentData.assignmentTitle,
                gradeComponent: gradeComponentUuidToId[assignmentData.uuid]
            });
        }

        return course;
    }

};