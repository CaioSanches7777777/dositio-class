import { test, describe } from 'node:test';
import assert, { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';

describe('###Tests for Server Configuration', async(t) => {
    test('Basic Server', async (t) => {
        const app = await build();

        t.after(async() => {
            await app.close();
        });
    
        deepEqual(options.stage,'test'); //'dev' no .env 
        deepEqual(options.port,'3000');
        deepEqual(options.host,'127.0.0.1'); //pode ser '1270.0.0.1'
        deepEqual(options.jwt_secret,'Abcd@1234');
        deepEqual(options.db_url,'mongodb://localhost:27017/dositio');

    });
});


describe('###Tests for Unauthenticated routes', async(t) => {
    describe('##Success Requests', async(t) => {
        test('# GET /products',async(t) => {
            const app = await build(options);

            t.after(async()=>{
                await app.close();
            });

            const response = await app.inject({
                method: 'GET',
                url: '/products'
            });

            equal(response.statusCode, 200);
        });

        test('# GET /categories', async(t)=>{
            const app = await build(options);
            t.after(async()=>{
                await app.close();
            });

            const response = await app.inject({
                method:'GET',
                url:'/categories'
            });

            equal(response.statusCode,200);
        });
    });

    describe('##Bad Requests', async(t) => {

    });
});


describe('###Tests for Authenticated routes', async(t) => {
    describe('##Success Requests', async(t) => {

    });
    
    describe('##Bad Requests', async(t) => {

    });
});


/*test('Basic Server', async (t) => {
    const app = await build();

    t.after(async() => {
        await app.close();
    });
    
    const response = await app.inject({
        method: 'GET',
        url: '/products'
    });

    assert.strictEqual(response.statusCode, 200);
    assert.deepEqual(response.json(), [
        {id: 1, name: 'Tomate', qtd: 20},
        {id: 2, name: 'Cebola', qtd: 50}
    ]);
}); */