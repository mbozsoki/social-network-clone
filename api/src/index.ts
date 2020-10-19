import {getOne, getAll, addPost} from './controllers/posts'
import {faunadbSecret} from './faunadb-secret';
import express from 'express';
import faunadb from 'faunadb';

const app = express();
export const client = new faunadb.Client({ secret: faunadbSecret });

app.get('/post/:id', getOne);
app.post('/post', addPost);
app.get('/posts', getAll);
app.listen(5000, () => console.log('App is listening on http://localhost:5000'));