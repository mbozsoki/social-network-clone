import faunadb from 'faunadb';
import { Request, Response } from 'express';
import { client } from '../index';

const { Paginate, Get, Match, Index, Create, Collection, Ref, Function: Fn, Call } = faunadb.query;

export const getOne = async (req: Request, res: Response) => {
  try {
    const doc = await client.query(Get(Ref(Collection('posts'), req.params.id)));
    res.send(doc);
  } catch (error) {
    res.send(error);
  }
};

export const addPost = async (_req: Request, res: Response) => {
  try {
    const data = {
      user: Call(Fn('getUser'), 'mbozsoki'),
      text: 'Hola Mundo',
    };
    const doc = await client.query(Create(Collection('posts'), { data }));
    res.send(doc);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const doc = await client.query(
      Paginate(Match(Index('posts_by_user'), Call(Fn('getUser'), 'mbozsoki'))),
    );
    res.send(doc);
  } catch (error) {
    res.send(error);
  }
};
