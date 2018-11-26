import dotenv from 'dotenv';

// import logger from './util/logger';

import { start as startApolloServer } from './servers/Apollo';
import { start as startMongoDB } from './db/MongoDB';
import { index as startExpress } from './servers/Express/index';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });

startApolloServer().then(() => {
  console.log('Apollo Server started');
});

const app = startExpress(startMongoDB());

export default app;