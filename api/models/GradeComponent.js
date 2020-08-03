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
        return await GradeComponent.create(gradeComponentData).fetch();
    },

    readComponentByCourse: async function(courseId) {
        return await GradeComponent.find({
            course: courseId
        });
    }

};