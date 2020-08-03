const User = require("../models/User");

module.exports = {

    homeRedirect: async function(req, res) {
        return res.redirect('/sign-in');
    },

    loginPage_GET: async function(req, res) {
        return res.view('pages/login.ejs');
    },

    loginPage_POST: async function(req, res) {
        let username = req.param('username', null);

        if (!username) {
            return res.view('pages/login.ejs', {
                error: 'Please enter a username.'
            });
        }

        let user = await User.readUserByUsername(username);

        if (!user) {
            return res.view('pages/login.ejs', {
                error: 'User not found.'
            });
        }

        req.session.userId = user.id

        return res.redirect('/dashboard');
    }

};