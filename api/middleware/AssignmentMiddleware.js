const Assignment = require("../models/Assignment");

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

            if (!assignment.dueDate) {
                errors.push('Please select a due date for assignment at index ' + i + '.');
            }
        }

        if (!assignmentData.gradeComponent) {
            errors.push('Please select a grading component that these assignments belong to.');
        }

        return errors;
    },

    createBulkAssignments: async function(assignmentData, userId) {
        let gradeComponentId = parseInt(assignmentData.gradeComponent);

        let assignments = [];

        for (let i = 0; i < assignmentData.assignments.length; i += 1) {
            let assignment = assignmentData.assignments[i];
            assignments.push(await Assignment.createAssignment({
                assignmentTitle: assignment.assignmentTitle,
                dueDate: assignment.dueDate,
                gradeComponent: gradeComponentId,
                user: userId
            }));
        }

        return assignments;
    }

};