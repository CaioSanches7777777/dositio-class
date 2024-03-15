import { AUTH_INVALID_TOKEN, AUTH_NO_TOKEN } from "../../libs/errors.js"; 
    

export const extractUser = (app) => async (request, reply) => {
    if(!request.headers['x-access-token']) throw new AUTH_NO_TOKEN();
    
    try{
        const user = app.jwt.verify(request.headers['x-access-token']);
        request.user = user.username;
        return;
    }catch(error){
        request.log.error(error);
        throw new AUTH_INVALID_TOKEN();
    }
};    

/*
export const extractUser = (app) => async (request, reply) => {
    if(!request.headers['x-access-token']) throw new AUTH_NO_TOKEN();
    else{
        app.jwt.verify(request.headers['x-access-token'], (err, decoded) => {
            if(err) throw new AUTH_INVALID_TOKEN();
            else{
                request.user = decoded.username;
            }
        });
    }
};
*/