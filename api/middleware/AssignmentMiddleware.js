module.exports = {

    validateNewAssignment: async function(assignmentData) {
        let errors = [];

        if (!assignmentData.assignmentTitle) {
            errors.push('Please enter a title for the assignment.');
        }

        return errors;
    }

};