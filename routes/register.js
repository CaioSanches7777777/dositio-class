/** @type{import('fastify').FastifyPluginAsync<>} */
import user from './auth.js';

export default async function register(app, options) {

    const users = app.mongo.db.collections('users');

    app.post('/register', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    username: { type: 'string' },
                    password: { type: 'string' } //criptografar
                },
                required: ['username', 'password']
            }
        },config:{
            requireAuthentication: false
        }
        }, async (request, reply) => {
                let user = request.body;

                let result = await users.insertOne(user);

                return reply.code(201).send();
        });
    
}