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

    deleteCourse: async function(courseId) {
        return await Course.destroyOne({
            id: courseId
        });
    }

};