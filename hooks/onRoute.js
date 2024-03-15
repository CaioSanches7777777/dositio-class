/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function onRouteHook(app, options) {
    const AuthError = createError('AuthError', 'X-ACCESS-TOKEN dont sent.', 401);
    const TokenError = createError('TokenError', 'Invalid token.', 401);
    
    const logMe = async (request, reply) => {
        request.log.info(`Request for url: ${request.url}.`);
    };

    const extractUser = async (request, reply) => {
        if(!request.headers['x-access-token']) throw new AuthError();
        else{
            app.jwt.verify(request.headers['x-access-token'], (err, decoded) => {
                if(err) throw new TokenError();
                else{
                    request.user = decoded.username;
                }
            });
        }
    };

    app.addHook('onRoute', (routeOptions) => {
        if(routeOptions.onRequest && !Array.isArray(routeOptions.onRequest)){
            routeOptions.onRequest = [routeOptions.onRequest];
        }else{
            routeOptions.onRequest = [];
        }

        if(routeOptions.config?.logMe){
            routeOptions.onRequest.push(logMe);
        }
        if(routeOptions.config?.requireAuthentication){
            routeOptions.onRequest.push(extractUser);
        }
    });
}