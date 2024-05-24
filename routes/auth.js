/** @type{import('fastify').FastifyPluginAsync<>} */
export default async function auth(app, options) {
    
    app.post('/auth', (request, reply) => {
        let user = request.body;
        request.log.info('USER> ', user);
        request.log.info(`Login for user ${user.username}`);
        //check login details
        delete user.password;
        return {
            'x-access-token' : app.jwt.sign(user)
        }

/*
        const auth = app.mongo.db.collection('registerUser');

    app.post('/auth', {schema: {
        body: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                password: {type: 'string'}
            },
            required: ['username', 'password']
        }
        }},
        async (request, reply) => {
        let user = request.body;
        let searchedUser = await auth.findOne({username: user.username})
        if(searchedUser.password != user.password){
            throw new ACCESS_UNAUHORIZED()
        }
        request.log.info(`Login for user ${user.username}`);
        //check login details
        delete user.password;
        return {
            'x-access-token' : app.jwt.sign(user)
        }*/
    });
}