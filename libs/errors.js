import createError from "@fastify/error";

export const AUTH_NO_TOKEN = createError(
    'AUTH_NO_TOKEN',
    'No token was found on request headers.',
    401
  );

export const AUTH_INVALID_TOKEN = createError(
    'AUTH_INVALID_TOKEN',
    'The tonken provided is invalid.',
    401
  );

export const NOT_FOUND = createError(
    'NOT_FOUND',
    'The requested resource could not be found',
    404
)