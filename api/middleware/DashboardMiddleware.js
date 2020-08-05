const User = require("../models/User");
const Course = require("../models/Course");
const GradeComponent = require("../models/GradeComponent");
const moment = require('moment');

module.exports = {

    getDashboardData: async function(userId) {
        let user = await User.readUserById(userId);
        let courses = await Course.readCoursesByUser(userId);
        let assignments = await Assignment.readAssignmentsByUser(userId);
        for (let i = 0; i < assignments.length; i += 1) {
            let gradeComponent = await GradeComponent.readComponentById(assignments[i].gradeComponent.id)
            assignments[i].courseName = gradeComponent.course.courseName;
            assignments[i].gradeComponent = gradeComponent;
        }

        // Calculate the impact of each assignment
        for (let i = 0; i < assignments.length; i += 1) {
            let totalAssignments = assignments[i].gradeComponent.assignments.length;
            let componentWeight = assignments[i].gradeComponent.gradePercentage;
            let weightPerAssignment = componentWeight / totalAssignments;
            let dueDate = moment(assignments[i].dueDate);
            let timeUntilDue = dueDate.diff(moment(), 'days');
            let dailyImpact = weightPerAssignment / timeUntilDue;
            assignments[i].dailyImpact = dailyImpact.toFixed(3);
        }

        // Order the assignment by daily impact level
        assignments.sort((a, b) => {
            if (a.dailyImpact < b.dailyImpact) {
                return 1;
            }

            if (a.dailyImpact > b.dailyImpact) {
                return -1;
            }

            if (a.dailyImpact == b.dailyImpact) {
                return 0;
            }
        });

        return {
            user: user,
            courses: courses,
            assignments: assignments
        };
    }

};