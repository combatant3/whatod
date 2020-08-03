const GradeComponent = require("../models/GradeComponent");

module.exports = {

    createGradeComponent_POST: async function(req, res) {
        let gradeComponentData = {
            componentName: req.param('componentName', null),
            gradePercentage: req.param('gradePercentage', null),
            course: req.param('course', null)
        };

        let gradeComponent = await GradeComponent.createGradeComponent(gradeComponentData);

        return res.json(gradeComponent);
    }

};