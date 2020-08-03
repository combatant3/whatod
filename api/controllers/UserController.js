const User = require("../models/User");

module.exports = {

    createUser_GET: async function(req, res) {
        return res.view('user/create-user');
    },

    createUser_POST: async function(req, res) {
        let userData = {
            username: req.param('username', null),
        };

        if (!userData.username) {
            return res.view('user/create-user', {
                error: 'Please enter a username.'
            });
        }

        let user = await User.createUser(userData);

        return res.json(user);
    },

    readUser: async function(req, res) {
        let username = req.param('username', null);

        if (!username) {
            return res.notFound();
        }

        let user = await User.readUserByUsername(username);

        if (!user) {
            return res.notFound();
        }

        return res.json(user);
    }

};