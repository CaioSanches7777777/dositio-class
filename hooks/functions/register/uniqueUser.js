import { ALREADY_EXISTS, AUTH_INVALID_TOKEN, AUTH_NO_TOKEN } from "../../../libs/errors.js"; 

export const checkExistence = (app) => async (request, reply) => {
    const register = app.mongo.db.collection('register');

    let user = request.body;

    let result = await register.count({username: user.username});

    if(result>0){
        throw new ALREADY_EXISTS 
    }
}