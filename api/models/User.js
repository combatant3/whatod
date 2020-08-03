module.exports = {

    attributes: {
        username: {
            type: 'string'
        },

        courses: {
            collection: 'course',
            via: 'user'
        }
    },

    createUser: async function(userData) {
        return await User.create({
            username: userData.username
        }).fetch();
    },

    readUserByUsername: async function(username) {
        return await User.findOne({
            username: username
        });
    },

    readUserById: async function(userId) {
        return await User.findOne({
            id: userId
        });
    }

};