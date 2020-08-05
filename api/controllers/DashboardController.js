const Course = require('../models/Course');
const User = require('../models/User');
const DashboardMiddleware = require('../middleware/DashboardMiddleware');
let moment = require('moment');

module.exports = {
    
    dashboardPage_GET: async function(req, res) {
        // Get all the data to populate the dashboard
        let viewData = await DashboardMiddleware.getDashboardData(req.session.userId);
        viewData.moment = moment;

        return res.view('pages/dashboard', viewData);
    }
    
};