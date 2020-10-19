import {getOne, getAll, addPost} from './controllers/posts'
import {faunadbSecret} from './faunadb-secret';

const app = require('express')();

export const faunadb = require('faunadb');
export const client = new faunadb.Client({ secret: faunadbSecret });

app.get('/post/:id', getOne);
app.post('/post', addPost);
app.get('/post', getAll);

app.listen(5000, () => console.log('App is listening on http://localhost:5000'));