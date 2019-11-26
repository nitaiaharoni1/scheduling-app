const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const index = require('./routes/index');
const users = require('./routes/users');
const events = require('./routes/events');
const organizations = require('./routes/organizations');
const app = express();
const port = process.env.PORT || 3002;

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/users', users);
app.use('/events', events);
app.use('/organizations', organizations);
app.use('/', index);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
