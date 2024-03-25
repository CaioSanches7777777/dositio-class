/** @type{import('fastify').FastifyPluginAsync<>} */

import products from './products.js';

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
        },config:{
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let categorie = request.body;
        request.log.info(`Including categorie ${categorie.name}.`);
        return categorie;
    });
    /*
    app.get('/categories/:id/products', async (request, reply) => {
        app.log.info('Categoria requisitada> ' + request.params.id);
        return {};
    });
    */
    app.get('/categories/:id/products', async (request, reply) => {
        let id = request.params.id;
        let categorie = await categories.findOne({_id: new app.mongo.ObjectId(id)});
        return categorie;
    });

    
    app.delete('/categories/:id',{
        config:{
            requireAuthentication: true
        }}, async (request, reply) => {
        let id = request.params.id;
        await products.deleteOne({_id: new app.mongo.ObjectId(id)});
        return reply.code(204).send();
    });
    

    app.put('/categories/:id', {
        config:{
            requireAuthentication: true
        }
    }, async (request,reply) => {
        let id = request.params.id;
        let categorie = request.body;

        await categories.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set:{
                name:categorie.name,
                qtd: categorie.qtd
            }
        });

        return reply.code(204).send();
    });

};
