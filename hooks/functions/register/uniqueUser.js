import { ALREADY_EXISTS, AUTH_INVALID_TOKEN, AUTH_NO_TOKEN } from "../../../libs/errors.js"; 

export const uniqueUser = (app) => async (request, reply) => {
    const registerUser = app.mongo.db.collection('registerUser');

    let user = request.body;

    let result = await registerUser.count({username: user.username});

    if(result>0){
        throw new ALREADY_EXISTS 
    }
}