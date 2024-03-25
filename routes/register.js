/** @type{import('fastify').FastifyPluginAsync<>} */
import user from './auth.js';

export default async function products(app, options) {

    app.post('/register', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    username: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['username', 'password']
            }
        },config:{
            requireAuthentication: false
        }
        }, async (request, reply) => {
                let user = request.body;

                let result = await register.insertOne(user);

                return reply.code(201).send();
        });
    
}