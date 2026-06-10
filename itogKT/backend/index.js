const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} [surname]
 * @property {string[]} pets
 * @property {string[]} colors
 */

/** @type {User[]} */
let users = [];
let nextId = 1;

app.post('/api/sign', (req, res) => {
    /** @type {string} */
    const name = req.body.name;
    
    if (!name) {
        return res.status(400).json({ error: 'Напиши имя' });
    }
    
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
            return res.status(400).json({ error: 'Имя уже есть' });
        }
    }
    
    /** @type {User} */
    const newUser = { id: nextId, name: name, pets: [], colors: [] };
    users.push(newUser);
    nextId++;
    
    res.json({ id: newUser.id, message: 'Твой номер: ' + newUser.id });
});

app.post('/api/check', (req, res) => {
    const name = req.body.name;
    
    /** @type {User | null} */
    let found = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
            found = users[i];
            break;
        }
    }
    
    if (found) {
        res.json({ exists: true, number: found.id, message: 'Номер: ' + found.id });
    } else {
        res.json({ exists: false, message: 'Такого нет' });
    }
});

app.post('/api/create', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    
    if (!name || !surname) {
        return res.status(400).json({ error: 'Нужно имя и фамилия' });
    }
    
    /** @type {User | null} */
    let found = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
            found = users[i];
            break;
        }
    }
    
    if (found) {
        found.surname = surname;
        res.json({ message: 'Добавил фамилию ' + surname });
    } else {
        /** @type {User} */
        const newUser = { id: nextId, name: name, surname: surname, pets: [], colors: [] };
        users.push(newUser);
        nextId++;
        res.json({ message: 'добавил нового: ' + name + ' ' + surname });
    }
});

app.post('/api/pet', (req, res) => {
    const id = req.body.id;
    const pet = req.body.pet;
    
    /** @type {User | null} */
    let found = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            found = users[i];
            break;
        }
    }
    
    if (!found) {
        return res.status(404).json({ error: 'Нет пользователя с номером ' + id });
    }
    
    if (!pet) {
        return res.status(400).json({ error: 'Напиши имя питомца' });
    }
    
    found.pets.push(pet);
    res.json({ message: 'Добавил питомца ' + pet, pets: found.pets });
});

app.post('/api/colors', (req, res) => {
    const id = req.body.id;
    /** @type {string[]} */
    const colorsList = req.body.colors;
    
    /** @type {User | null} */
    let found = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            found = users[i];
            break;
        }
    }
    
    if (!found) {
        return res.status(404).json({ error: 'Нет пользователя с номером ' + id });
    }
    
    if (!colorsList || colorsList.length === 0) {
        return res.status(400).json({ error: 'Напиши цвета' });
    }
    
    for (let i = 0; i < colorsList.length; i++) {
        found.colors.push(colorsList[i]);
    }
    
    res.json({ message: 'Цвета добавлены', colors: found.colors });
});

app.listen(5000, () => {
    console.log('✅ Сервер запущен на http://localhost:5000');
});