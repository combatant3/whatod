module.exports = {

    attributes: {
        courseName: {
            type: 'string',
            required: true
        },

        user: {
            model: 'user',
            required: true
        },

        gradeComponents: {
            collection: 'gradecomponent',
            via: 'course'
        },

        startDate: {
            type: 'string'
        },

        endDate: {
            type: 'string'
        }
    },

    createCourse: async function(courseData) {
        return await Course.create(courseData).fetch();
    },

    readCoursesByUser: async function(userId) {
        return await Course.find({
            user: userId
        }).populate('gradeComponents');
    },

    readCourseById: async function(courseId) {
        return await Course.findOne({
            id: courseId
        });
    },

    updateCourse: async function(courseData, courseId) {
        return await Course.update({
            id: courseId
        }).set(courseData);
    },

    deleteCourse: async function(courseId) {
        return await Course.destroyOne({
            id: courseId
        });
    }

};
