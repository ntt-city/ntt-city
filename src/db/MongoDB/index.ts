import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import session from 'express-session';
import bluebird from 'bluebird';
import { MONGODB_URI, SESSION_SECRET } from '../../util/secrets';

const MongoStore = mongo(session);

export const start = () => {
    // Connect to MongoDB
    const mongoUrl = MONGODB_URI;
    (<any>mongoose).Promise = bluebird;
    mongoose.connect(mongoUrl, {useMongoClient: true}).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    // process.exit();
    });

    return session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        store: new MongoStore({
            url: mongoUrl,
            autoReconnect: true
        })
    });
};

