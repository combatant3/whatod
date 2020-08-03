const Course = require('../models/Course');
const User = require('../models/User');

module.exports = {
    
    dashboardPage_GET: async function(req, res) {
        // Get all the data to populate the dashboard
        let userId = req.session.userId;
        let user = await User.readUserById(userId);
        let courses = await Course.readCoursesByUser(userId);

        const viewData = {
            user: user,
            courses: courses
        };

        return res.view('pages/dashboard', viewData);
    }
    
};