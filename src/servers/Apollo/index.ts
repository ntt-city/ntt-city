// https://medium.com/@19majkel94/graphql-typescript-typegraphql-ba0225cb4bed
// https://github.com/19majkel94/type-graphql/blob/master/examples/typeorm-basic-usage/index.ts
// https://github.com/19majkel94/type-graphql
// https://github.com/dotansimha/graphql-code-generator
// https://www.npmjs.com/package/graphql-ts

import { bootstrap } from './bootstrap';
import { ApolloServer, ServerInfo } from 'apollo-server';
const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
import { createStore } from '../../db/MySQL/createStore';

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const internalEngineDemo = require('./engine-demo');

export const start = () => {
    bootstrap();


// creates a sequelize connection once. NOT for every request
    const store = createStore();

// set up any dataSources our resolvers need
    const dataSources = () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({store}),
    });

// the function that sets up the global context for each resolver, using the req
    const context = async ({ req }) => {
        // simple auth check on every request
        const auth = (req.headers && req.headers.authorization) || '';
        const email = new Buffer(auth, 'base64').toString('ascii');

        // if the email isn't formatted validly, return null for user
        if (!isEmail.validate(email)) return {user: null};
        // find a user by their email
        const users = await store.users.findOrCreate({where: {email}});
        const user = users && users[0] ? users[0] : null;

        return {user: {...user.dataValues}};
    };

// Set up Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources,
        context,
        engine: {
            apiKey: process.env.ENGINE_API_KEY,
            ...internalEngineDemo,
        },
    });

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually index it in a test
    if (process.env.NODE_ENV !== 'test')
        server
            .listen({port: 4000})
            .then(({ url }: ServerInfo) => console.log(`🚀 app running at ${url}`));


    return server;
};

/*
// export all the important pieces for integration/e2e tests to use
module.exports = {
    dataSources,
    context,
    typeDefs,
    resolvers,
    ApolloServer,
    LaunchAPI,
    UserAPI,
    store,
    server,
};
*/