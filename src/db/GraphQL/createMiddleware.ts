// https://medium.com/@19majkel94/graphql-typescript-typegraphql-ba0225cb4bed
// https://github.com/19majkel94/type-graphql/blob/master/examples/typeorm-basic-usage/index.ts
// https://github.com/19majkel94/type-graphql
// https://github.com/dotansimha/graphql-code-generator
// https://www.npmjs.com/package/graphql-ts

import graphqlHTTP /*, { Middleware }*/ from 'express-graphql';
import { Request, Response } from 'express';
// import { DocumentNode, GraphQLSchema, GraphQLError } from 'graphql';

type Middleware = (request: Request, response: Response) => Promise<undefined>;

export const createMiddleware = (): Middleware => {

    const schema = require('./schemas');

    return graphqlHTTP({

        schema: schema,

        graphiql: true,
    });
};