import { Response, Request, Router } from "express";
import { pool } from "../postgresql/config";

const router: Router = Router();

router.get('/api/users', ( req: Request, resp: Response ) => {
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) 
            throw new Error(error.message);
        resp.status(200).json(result.rows);
    });
});

router.get('/api/users/:id', ( req: Request<User>, resp: Response ) => {
    const id: number = parseInt(req.params.id);
    pool.query('SELECT * FROM users WHERE id = $1', [ id ], (error, result) => {
        if (error) 
            throw new Error(error.message);
        resp.status(200).json(result.rows);
    });
});

router.post('/api/users', ( req: Request<void, void, User>, resp: Response ) => {
    const { email, name } = req.body;
    pool.query('INSERT INTO users (name, email) VALUES($1, $2) RETURNING *', [ name, email ], (error, result) => {
        if(error)
            throw new Error(error.message);
        resp.status(201).json(result.rows);
    });
});

router.put('/api/users', (req: Request<void, void, User>, resp: Response) => {
    const { name, email } = req.body;
    const id: number = parseInt(req.body.id);
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [ name, email, id ], (error, result) => {
        if (error)
            throw new Error(error.message);
        resp.status(201).send(`Usuario modificado con ID: ${ id }`);
    });
});

router.delete('/api/users/:id', (req: Request<User>, resp: Response) => {
    const id: number = parseInt(req.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [ id ], (error, result) => {
        if(error)
            throw new Error(error.message);
        resp.status(200).send(`Usuario eliminado con ID: ${ id }`);
    });
});

interface User {
    id: string
    name: string,
    email: string
}

export {
    router
}