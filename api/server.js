const express = require('express');
const apiRouter = require('./apiRouter');
const middleware = require('./middleware');
const session = require('express-session');
const KnexSessionStorage = require('connect-session-knex')(session);

const knexConnection = require('../data/db-config');
const server = express();
const sessionConfig = {
    name: 'loggedIn',
    secret: process.env.COOKIE_SECRET || 'cookieSecret',
    cookie: {
        maxAge: 1000*60*60, 
        secure: process.env.NODE_ENV === 'development' ? false : true, 
        httpOnly: true, 
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStorage({
        knex: knexConnection,
      clearInterval: 1000 * 60 * 10,
        tablename: 'user_sessions',
        sidfildname: 'id',
        createTable: true
    }) 
}

middleware(server);
server.use(session(sessionConfig))
server.use('/api', apiRouter);

module.exports = server;