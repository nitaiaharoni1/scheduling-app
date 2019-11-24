const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const index = require('./routes/index');
const users = require('./routes/users');
const rooms = require('./routes/rooms');
const app = express();
const port = process.env.PORT || 3001;
// app.use(cors());
// app.options('*', cors());

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/users', users);
app.use('/rooms', rooms);
app.use('/', index);


/// catch 404 and forward to error handler
// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

/// error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use((err, req, res, next) => {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err,
//             title: 'error'
//         });
//     });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {},
//         title: 'error'
//     });
// });
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
