/** @type{import('fastify').FastifyPluginAsync<>} */

import products from './products.js';

export default async function categories(app, options) {

    const categories = app.mongo.db.collection('categories');
    const products = app.mongo.db.collection('products');

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
                    name: { type: 'string' },
                    img_url: {type: 'string'}
                },
                required: ['name', 'img_url']
            }
        },config:{
            requireAuthentication: true,
            checkAdmin: true
        }
    }, async (request, reply) => {
        let category = request.body;
        let result = await categories.insertOne(category);
        request.log.info(`Including category ${category.name}.`);
        return reply.code(201).send();
    });
    /*
    app.get('/categories/:id/products', async (request, reply) => {
        app.log.info('Categoria requisitada> ' + request.params.id);
        return {};
    });
    */
    app.get('/categories/:id/products', async (request, reply) => {
        let id = request.params.id;
        let category = await categories.findOne({_id: new app.mongo.ObjectId(id)});
        let categoryName = category.name;
        let productsCategory = await products.find({category: categoryName}).toArray();
        return productsCategory; 
    });

    app.get('/categories/:id', async (request, reply) => {
        let id = request.params.id;
        let category = await categories.findOne({_id: new app.mongo.ObjectId(id)});
        return category;
    });

    app.delete('/categories/:id',{
        config:{
            requireAuthentication: true
        }}, async (request, reply) => {
        let id = request.params.id;
        await categories.deleteOne({_id: new app.mongo.ObjectId(id)});
        return reply.code(204).send();
    });
    

    app.put('/categories/:id', {
        config:{
            requireAuthentication: true
        }
    }, async (request,reply) => {
        let id = request.params.id;
        let category = request.body;

        await categories.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set:{
                name:category.name,
                img_url:category.img_url
            }
        });

        return reply.code(204).send();
    });

};
