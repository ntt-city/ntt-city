import dotenv from 'dotenv';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });

import { start } from './servers/Express';

export default start();
