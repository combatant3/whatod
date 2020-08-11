const Assignment = require("../models/Assignment");
const AssignmentMiddleware = require("../middleware/AssignmentMiddleware");

module.exports = {

    createAssignment_GET: async function(req, res) {
        let userId = req.session.userId;
        let courses = await Course.readCoursesByUser(userId);

        let viewData = {
            courses: courses
        };

        if (req.session.errors && req.session.errors.length > 0) {
            viewData.errors = req.session.errors;
        }

        return res.view('pages/create-assignment', viewData);
    },

    createAssignment_POST: async function(req, res) {
        let assignmentData = req.allParams();

        let errors = await AssignmentMiddleware.validateNewAssignments(assignmentData);
        if (errors && errors.length > 0) {
            req.session.errors = errors;
            return res.redirect('/assignment/create');
        }

        await AssignmentMiddleware.createBulkAssignments(assignmentData, req.session.userId);

        return res.redirect('/dashboard');
    }

};
