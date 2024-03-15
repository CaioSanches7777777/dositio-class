

export const logMe = (app) => async (request, reply) => {
    request.log.info(`Request for url: ${request.url}.`);
};