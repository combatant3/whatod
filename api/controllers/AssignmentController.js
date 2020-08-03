const Assignment = require("../models/Assignment");

module.exports = {

    createAssignment_GET: async function(req, res) {
        return res.view('pages/create-assignment');
    },

    createAssignment_POST: async function(req, res) {
        let assignmentData = {
            assignmentTitle: req.param('assignmentTitle', null),
            gradeComponent: req.param('gradeComponent', null)
        };

        let assignment = await Assignment.createAssignment(assignmentData);

        return res.json(assignment);
    }

};