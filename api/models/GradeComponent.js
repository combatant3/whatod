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

    readComponentsByCourse: async function(courseId) {
        return await GradeComponent.find({
            course: courseId
        });
    },

    readComponentById: async function(componentId) {
        return await GradeComponent.findOne({
            id: componentId
        }).populate('course').populate('assignments');
    }

};