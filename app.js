import fastify from 'fastify';
import createError from '@fastify/error';
import autoload from '@fastify/autoload';
import mongodb from '@fastify/mongodb';
import jwt from '@fastify/jwt';
import { fileURLToPath } from 'url';
import path from 'path';
import  dotenv  from 'dotenv';

dotenv.config();

export const options = {
    stage: process.env.STAGE,
    port: process.env.PORT,
    host: process.env.HOST,
    logger: process.env.STAGE == 'dev' ? {transport: {target: 'pino-pretty'}}: true,
    jwt_secret: process.env.JWT_SECRET,
    db_url: process.env.DB_URL
 };

//options.logger = process.stdout.isTTY ? { transport : { target: 'pino-pretty'} } : true;
//options.jwt_secret = process.env.JWT_SECRET || 'Abcd@1234';


//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const MyCustomError = createError('MyCustomError', 'Something stranged happened.', 501);

export async function build(opts){
    const app = fastify(opts);

    await app.register(jwt, { //chave secreta
        secret: opts.jwt_secret
    });

    await app.register(mongodb, {
        url: opts.db_url
    });

    await app.register(autoload, {
        dir: path.join(__dirname, 'hooks'),
        encapsulate: false,
        ignoreFilter:(path) => {
            return path.includes('functions');
        }
    });

    await app.register(autoload, {
        dir: path.join(__dirname, 'routes')
    });


    app.get('/error', (request, reply) => {
        throw new MyCustomError();
    });
 

    app.setErrorHandler(async (error, request, reply) => {
        const  { validation } = error;
        request.log.error({ error });
        reply.code(error.statusCode || 500);

        
        return validation ? `Validation Error: ${validation[0].message}.` : 'Internal Server Error';
    });

    app.get('/notfound', async (request, reply) => {
        request.log.info('Sending to not found handler.');
        reply.callNotFound();
    });

    app.setNotFoundHandler(async (request, reply) => {
        reply.code(404);
        return 'Resource not found.';
    });

    return app;
}