const CourseMiddleware = require("../middleware/CourseMiddleware");

module.exports = {

    createCourse_GET: async function(req, res) {
        return res.view('pages/create-course');
    },

    createCourse_POST: async function(req, res) {
        if (!req.session.userId) {
            return res.redirect('/sign-in');
        }

        let courseData = req.allParams();

        let errors = await CourseMiddleware.validateNewCourse(courseData);
        if (errors && errors.length > 0) {
            return res.json(errors);
        }

        let course = await CourseMiddleware.createCourse(courseData, req.session.userId);

        return res.json(course);
    }

};