const { resolvers } = require('../../graphqlMetodos/resolversMetodos');

const all_landing = async(req, res) => {
    const data = await resolvers.Query.allLanding(null, {});
    res.send(data);
}

module.exports = {all_landing};