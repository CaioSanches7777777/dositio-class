/** @type{import('fastify').FastifyPluginAsync<>} */
export default async function auth(app, options) {
    

/*
    app.post('/auth', (request, reply) => {
        let user = request.body;
        request.log.info(`Login for user ${user.username}`);
        //check login details
        delete user.password;
        return {
            'x-access-token' : app.jwt.sign(user)
        }
    });
    */
    
    
    const auth = app.mongo.db.collection('auth');

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
        (request, reply) => {
        let user = request.body;
        request.log.info(`Login for user ${user.username}`);
        //check login details
        delete user.password;
        return {
            'x-access-token' : app.jwt.sign(user)
        }
    });

}

