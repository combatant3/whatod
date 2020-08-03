module.exports = {

    attributes: {
        componentName: {
            type: 'string',
            required: true
        },

        gradePercentage: {
            type: 'string',
            required: true
        },

        course: {
            model: 'course'
        },

        assignments: {
            collection: 'assignment',
            via: 'gradeComponent'
        }
    },

    createGradeComponent: async function(gradeComponentData) {
        return GradeComponent.create(gradeComponentData).fetch();
    }

};