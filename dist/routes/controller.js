"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const config_1 = require("../postgresql/config");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/api/users', (req, resp) => {
    config_1.pool.query('SELECT * FROM users', (error, result) => {
        if (error)
            throw new Error(error.message);
        resp.status(200).json(result.rows);
    });
});
router.get('/api/users/:id', (req, resp) => {
    const id = parseInt(req.params.id);
    config_1.pool.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
        if (error)
            throw new Error(error.message);
        resp.status(200).json(result.rows);
    });
});
router.post('/api/users', (req, resp) => {
    const { email, name } = req.body;
    config_1.pool.query('INSERT INTO users (name, email) VALUES($1, $2) RETURNING *', [name, email], (error, result) => {
        if (error)
            throw new Error(error.message);
        resp.status(201).json(result.rows);
    });
});
router.put('/api/users', (req, resp) => {
    const { name, email } = req.body;
    const id = parseInt(req.body.id);
    config_1.pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, result) => {
        if (error)
            throw new Error(error.message);
        resp.status(201).send(`Usuario modificado con ID: ${id}`);
    });
});
router.delete('/api/users/:id', (req, resp) => {
    const id = parseInt(req.params.id);
    config_1.pool.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
        if (error)
            throw new Error(error.message);
        resp.status(200).send(`Usuario eliminado con ID: ${id}`);
    });
});
