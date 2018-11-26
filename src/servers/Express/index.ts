import express from 'express';
import compression from 'compression';  // compresses requests
import bodyParser from 'body-parser';
import lusca from 'lusca';
import flash from 'express-flash';
import path from 'path';
import expressValidator from 'express-validator';

import errorHandler from 'errorhandler';

import { start as startMongoDB } from '../../db/MongoDB/index';

import passport from 'passport';
import * as passportConfig from '../../config/passport';

// Controllers (route handlers)
import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import * as apiController from './controllers/api';
import * as contactController from './controllers/contact';
import Cors from 'cors';

export const start = () => {
    // Create Express server
    const app = express();

    // Express configuration
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());

    app.use(Cors());
    app.use(startMongoDB());

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(lusca.xframe('SAMEORIGIN'));
    app.use(lusca.xssProtection(true));
    app.use((req, res, next) => {
        res.locals.user = req.user;
        next();
    });
    app.use((req, res, next) => {
        // After successful login, redirect back to the intended page
        if (!req.user &&
            req.path !== '/login' &&
            req.path !== '/signup' &&
            !req.path.match(/^\/auth/) &&
            !req.path.match(/\./)) {
            req.session.returnTo = req.path;
        } else if (req.user &&
            req.path == '/account') {
            req.session.returnTo = req.path;
        }
        next();
    });

    app.use(
        express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
    );

    /**
     * Primary app routes.
     */
    app.get('/', homeController.index);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);
    app.get('/logout', userController.logout);
    app.get('/forgot', userController.getForgot);
    app.post('/forgot', userController.postForgot);
    app.get('/reset/:token', userController.getReset);
    app.post('/reset/:token', userController.postReset);
    app.get('/signup', userController.getSignup);
    app.post('/signup', userController.postSignup);
    app.get('/contact', contactController.getContact);
    app.post('/contact', contactController.postContact);
    app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
    app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
    app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
    app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
    app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

    /**
     * API examples routes.
     */
    app.get('/api', apiController.getApi);
    app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

    /**
     * Error Handler. Provides full stack - remove for production
     */
    app.use(errorHandler());

    /**
     * Start Express server.
     */
    const server = app.listen(app.get('port'), () => {
        console.log(
            '  App is running at http://localhost:%d in %s mode',
            app.get('port'),
            app.get('env')
        );
        console.log('  Press CTRL-C to stop\n');
    });

    return server;
};
