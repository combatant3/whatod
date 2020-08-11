const User = require("../models/User");
const Course = require("../models/Course");
const GradeComponent = require("../models/GradeComponent");
const moment = require('moment');

module.exports = {

    getDashboardData: async function(userId) {
        let user = await User.readUserById(userId);
        let courses = await Course.readCoursesByUser(userId);
        let today = moment().format('YYYY-MM-DD');

        // Get all the assignments due in the future
        let assignments = await Assignment.readAssignmentsByUser(userId);
        for (let i = 0; i < assignments.length; i += 1) {
            let gradeComponent = await GradeComponent.readComponentById(assignments[i].gradeComponent.id)
            assignments[i].courseName = gradeComponent.course.courseName;
            assignments[i].gradeComponent = gradeComponent;
        }
        let query = `
        SELECT *
        FROM assignment A
        WHERE DATE(A.dueDate) > ${today}`;

        let assignmentsQuery = await sails.sendNativeQuery(query, []);

        // Sort through assignments
        let upcomingAssignments = [];
        let pastAssignments = [];
        for (let i = 0; i < assignments.length; i += 1) {
            if (moment(assignments[i].dueDate).isAfter(moment())) {
                upcomingAssignments.push(assignments[i]);
            } else {
                pastAssignments.push(assignments[i]);
            }
        }

        // Calculate the impact of each assignment
        for (let i = 0; i < upcomingAssignments.length; i += 1) {
            let totalAssignments = upcomingAssignments[i].gradeComponent.assignments.length;
            let componentWeight = upcomingAssignments[i].gradeComponent.gradePercentage;
            let weightPerAssignment = componentWeight / totalAssignments;
            let dueDate = moment(upcomingAssignments[i].dueDate);
            let timeUntilDue = dueDate.diff(moment(), 'days');
            let dailyImpact = weightPerAssignment / timeUntilDue;
            if (timeUntilDue < 1) { dailyImpact = 50; }
            upcomingAssignments[i].dailyImpact = dailyImpact.toFixed(3);
        }

        // Order the assignment by daily impact level
        upcomingAssignments.sort((a, b) => {
            if (a.dailyImpact < b.dailyImpact) {
                return 1;
            }

            if (a.dailyImpact > b.dailyImpact) {
                return -1;
            }

            if (a.dailyImpact === b.dailyImpact) {
                if (moment(a.dueDate).isBefore(moment(b.dueDate))) {
                    return -1;
                }

                if (moment(b.dueDate).isBefore(moment(a.dueDate))) {
                    return 1;
                }

                return 0;
            }
        });

        return {
            user: user,
            courses: courses,
            upcomingAssignments: upcomingAssignments,
            pastAssignments: pastAssignments
        };
    }

};
