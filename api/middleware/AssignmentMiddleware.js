const Assignment = require("../models/Assignment");
const moment = require('moment');

const MON = 1;
const TUE = 2;
const WED = 3;
const THU = 4;
const FRI = 5;
const SAT = 6;
const SUN = 7;

function recurringDayToDueDate(dayOfWeek, afterThisDate) {

}

module.exports = {

    /**
     * Validate the parameters of all the new assignments to create for a grade component.
     * @param {Object} assignmentData
     * @example
     *  {
     *      assignments: [
     *          assignmentTitle: 'title',
     *          dueDate: 'mm-dd-yyyy'
     *      ],
     *      gradeComponent: '1'
     *  }
     *
     * @return the errors from validation.
     */
    validateNewAssignments: async function(assignmentData) {
        let errors = [];

        for (let i = 0; i < assignmentData.assignments.length; i += 1) {
            let assignment = assignmentData.assignments[i];
            if (!assignment.assignmentTitle) {
                errors.push('Please enter a title for the assignment at index ' + i + '.');
            }

            if (!assignment.dueDate && !assignment.isRecurring) {
                errors.push('Please select a due date for assignment at index ' + i + '.');
            }

            if (assignment.isRecurring && assignment.isRecurring === 'on') {
                if (
                  !assignment.recurringDay_0 &&
                  !assignment.recurringDay_1 &&
                  !assignment.recurringDay_2 &&
                  !assignment.recurringDay_3 &&
                  !assignment.recurringDay_4 &&
                  !assignment.recurringDay_5 &&
                  !assignment.recurringDay_6
              ) {
                  errors.push('Please choose the days that assignment at index ' + i + ' re-occurs.');
              }
            }
        }

      if (!assignmentData.gradeComponent) {
            errors.push('Please select a grading component that these assignments belong to.');
        }

        if (!assignmentData.course) {
            errors.push('Please select a course that these assignments belong to.');
        }

        return errors;
    },

    createRecurringAssignments: async function(courseCreationParams) {
        let { gradeComponentId, courseId, course, assignment, day, userId } = courseCreationParams;
        let assignments = [];

        // Find the first sunday after the course start date
        let recurringDay = day;
        let startDate = moment(course.startDate).isoWeekday();
        let endDate = moment(course.endDate);

        let assignmentDueDate = '';
        if (startDate <= recurringDay) {
            assignmentDueDate = moment(course.startDate).day(recurringDay);
        } else {
            assignmentDueDate = moment(course.startDate).add(1, 'w').day(recurringDay);
        }

        while (assignmentDueDate.isBefore(endDate) || assignmentDueDate.isSame(endDate)) {
            // Create the new assignment
            assignments.push(await Assignment.createAssignment({
                assignmentTitle: assignment.assignmentTitle,
                dueDate: moment(assignmentDueDate).format('YYYY-MM-DD'),
                gradeComponent: gradeComponentId,
                course: courseId,
                user: userId
            }));

            assignmentDueDate.add(7, 'd');
        }

        return assignments;
    },

    createBulkAssignments: async function(assignmentData, userId) {
        let gradeComponentId = parseInt(assignmentData.gradeComponent);
        let courseId = parseInt(assignmentData.course)
        let course = await Course.readCourseById(courseId);

        let assignments = [];

        for (let i = 0; i < assignmentData.assignments.length; i += 1) {
            let assignment = assignmentData.assignments[i];

            let isRecurring = assignment.isRecurring === 'on';

            let courseCreationParams = {
                gradeComponentId: gradeComponentId,
                course: course,
                courseId: courseId,
                assignment: assignment,
                userId: userId
            };

            if (isRecurring) {
                if (assignment.recurringDay_0) {
                    courseCreationParams.day = SUN;
                    assignments = assignments.concat(await this.createRecurringAssignments(courseCreationParams));
                }

                if (assignment.recurringDay_1) {
                    courseCreationParams.day = MON;
                    assignments = assignments.concat(await this.createRecurringAssignments(courseCreationParams));
                }


                if (assignment.recurringDay_2) {
                    courseCreationParams.day = TUE;
                    assignments = assignments.concat(await this.createRecurringAssignments(courseCreationParams));
                }

                if (assignment.recurringDay_3) {
                    courseCreationParams.day = WED;
                    assignments = assignments.concat(await this.createRecurringAssignments(courseCreationParams));
                }

                if (assignment.recurringDay_4) {
                    courseCreationParams.day = THU;
                    assignments = assignments.concat(await this.createRecurringAssignments(courseCreationParams));
                }

                if (assignment.recurringDay_5) {
                    courseCreationParams.day = FRI;
                    assignments = assignments.concat(await this.createRecurringAssignments(courseCreationParams));
                }

                if (assignment.recurringDay_6) {
                    courseCreationParams.day = SAT;
                    assignments = assignments.concat(await this.createRecurringAssignments(courseCreationParams));
                }
            } else {
                assignments.push(await Assignment.createAssignment({
                    assignmentTitle: assignment.assignmentTitle,
                    gradeComponent: gradeComponentId,
                    dueDate: assignment.dueDate,
                    user: userId,
                    course: courseId
                }));
            }
        }

        return assignments;
    }

};
