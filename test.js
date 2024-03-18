import test from 'node:test';
import assert from 'node:assert';
import { build } from './app.js';

test('Basic Server', async (t) => {
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
});