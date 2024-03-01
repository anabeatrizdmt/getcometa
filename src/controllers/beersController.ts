import { Beer } from "../model/Beer";
import { Request, Response } from 'express';

let beers: Beer[] = [
    { id: '1', name: 'Corona', price: 9 },
    { id: '2', name: 'Sol', price: 9.5 },
    { id: '3', name: 'Dos Equis', price: 10 }
];

export const beersController = {
    getBeers: (request: Request, response: Response) => {
        response.json({ beers });
    },
};