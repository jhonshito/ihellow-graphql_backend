const { resolvers } = require('../../graphqlMetodos/resolversMetodos');

const all_users = async(req, res) => {
    const data = await resolvers.Query.allUsers(null, {});
    res.send(data);
}

module.exports = {all_users};