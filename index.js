const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

//? routers importing
const booksRouter = require('./dependency_injection/books_router');
const chaptersRouter = require('./dependency_injection/chapters_router');
const requestsRouter = require('./dependency_injection/requests_router');
const usersRouter = require('./dependency_injection/users_router');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());



app.use('/books', booksRouter);
app.use('/chapters', chaptersRouter);
app.use('/users', usersRouter);
app.use('/requests', requestsRouter);

app.listen(4000, 'localhost', () => {
    console.log('SERVER IS RUNNING');
});

