const CourseMiddleware = require("../middleware/CourseMiddleware");
const Course = require("../models/Course");
const GradeComponent = require("../models/GradeComponent");

module.exports = {

    createCourse_GET: async function(req, res) {
        return res.view('pages/create-course');
    },

    createCourse_POST: async function(req, res) {
        let viewData = {};
        if (!req.session.userId) {
            return res.redirect('/login');
        }

        let courseData = req.allParams();

        let errors = await CourseMiddleware.validateNewCourse(courseData);
        if (errors && errors.length > 0) {
            viewData.errors = errors;
            viewData.formData = courseData;
            return res.view('pages/create-course', viewData)
        }

        let course = await CourseMiddleware.createCourse(courseData, req.session.userId);

        return res.redirect('/dashboard');
    },

    editCourse_GET: async function(req, res) {
        let viewData = {};

        let courseId = req.param('courseId', '');
        let course = await Course.readCourseById(courseId);

        if (!course) {
            return res.notFound();
        }

        let gradeComponents = await GradeComponent.readComponentByCourse(course.id);
        course.gradeComponents = gradeComponents;

        viewData.formData = course;

        return res.view('pages/edit-course', viewData);
    },

    deleteCourse: async function(req, res) {
        let courseId = req.param('courseId', null);

        if (!courseId) {
            return res.notFound();
        }

        await Course.deleteCourse(courseId);

        return res.redirect('/dashboard');
    }

};