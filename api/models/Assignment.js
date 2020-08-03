module.exports = {

    attributes: {
        assignmentTitle: {
            type: 'string'
        },

        gradeComponent: {
            model: 'gradecomponent'
        }
    },

    createAssignment: async function(assignmentData) {
        return await Assignment.create(assignmentData).fetch();
    }

};