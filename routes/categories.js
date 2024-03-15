/** @type{import('fastify').FastifyPluginAsync<>} */

export default async function categories(app, options) {

    const categories = app.mongo.db.collection('categories');

    app.get('/categories', 
        {   
            //para exigir autenticação
            config: {
                logMe: true,
                requireAuthentication: true
            }
        }, 
        async (request, reply) => {
            request.log.info(categories);
        return await categories.find().toArray();
    });

    app.post('/categories', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' }
                    
                },
                required: ['name']
            }
        }
    }, async (request, reply) => {
        let categorie = request.body;
        request.log.info(`Including categorie ${categorie.name}.`);
        return categorie;
    });
    
    app.get('/categories/:id', async (request, reply) => {
        app.log.info('Categoria requisitada> ' + request.params.id);
        return {};
    });

};
