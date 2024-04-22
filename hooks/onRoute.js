/** @type{import('fastify').FastifyPluginAsync<>} */
import {checkExistence, extractUser, logMe, uniqueUser} from './functions/index.js'

export default async function onRouteHook(app, options) {

    

    app.addHook('onRoute', (routeOptions) => {
        if(routeOptions.onRequest && !Array.isArray(routeOptions.onRequest)){
            routeOptions.onRequest = [routeOptions.onRequest];
        }else{
            routeOptions.onRequest = [];
        }

        if(routeOptions.preHandler && !Array.isArray(routeOptions.preHandler)){
            routeOptions.preHandler = [routeOptions.preHandler];
        }else{
            routeOptions.preHandler = [];
        }

        if(routeOptions.config?.logMe){
            routeOptions.onRequest.push(logMe(app));
        }
        if(routeOptions.config?.requireAuthentication){
            routeOptions.onRequest.push(extractUser(app));
        }if(routeOptions.url === '/products' && routeOptions.method === 'POST'){
            routeOptions.preHandler.push(checkExistence(app));
        }if(routeOptions.url === '/registerUser' && routeOptions.method === 'POST'){
            routeOptions.preHandler.push(uniqueUser(app));
        }
    });

}