const STATUSES = [
    'todo',
    'done'
];

module.exports = {

    attributes: {
        assignmentTitle: {
            type: 'string'
        },

        gradeComponent: {
            model: 'gradecomponent'
        },

        dueDate: {
            type: 'string'
        },

        user: {
            model: 'user'
        },

        status: {
            type: 'string',
            isIn: STATUSES,
            defaultsTo: STATUSES[0]
        }
    },

    createAssignment: async function(assignmentData) {
        return await Assignment.create(assignmentData).fetch();
    },

    readAssignmentsByUser: async function(userId) {
        return await Assignment.find({
            user: userId
        }).populate('gradeComponent');
    }

};