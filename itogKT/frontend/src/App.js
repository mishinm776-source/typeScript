import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [userId, setUserId] = useState('');
    const [pet, setPet] = useState('');
    const [colors, setColors] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const sendRequest = async (endpoint, data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/' + endpoint, data);
            setResult(response.data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'Ошибка');
            setResult(null);
        }
    };

    return (
        <div style={{ padding: 20, fontFamily: 'Arial' }}>
            <h2>Моё приложение</h2>
            <hr />

            {/* 1 */}
            <div style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
                <b>1. Регистрация (/sign)</b><br />
                <input placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />
                <button onClick={() => sendRequest('sign', { name })}>Зарегаться</button>
            </div>

            {/* 2 */}
            <div style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
                <b>2. Проверка (/check)</b><br />
                <input placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />
                <button onClick={() => sendRequest('check', { name })}>Проверить</button>
            </div>

            {/* 3 */}
            <div style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
                <b>3. Создать или добавить фамилию (/create)</b><br />
                <input placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />
                <input placeholder="Фамилия" value={surname} onChange={e => setSurname(e.target.value)} />
                <button onClick={() => sendRequest('create', { name, surname })}>Выполнить</button>
            </div>

            {/* 4 */}
            <div style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
                <b>4. Добавить питомца (/pet)</b><br />
                <input placeholder="Номер" type="number" value={userId} onChange={e => setUserId(e.target.value)} />
                <input placeholder="Питомец" value={pet} onChange={e => setPet(e.target.value)} />
                <button onClick={() => sendRequest('pet', { id: Number(userId), pet })}>Добавить</button>
            </div>

            {/* 5 */}
            <div style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
                <b>5. Добавить цвета (/colors)</b><br />
                <input placeholder="Номер" type="number" value={userId} onChange={e => setUserId(e.target.value)} />
                <input placeholder="Цвета через запятую" value={colors} onChange={e => setColors(e.target.value)} />
                <button onClick={() => {
                    const colorsArray = colors.split(',').map(c => c.trim());
                    sendRequest('colors', { id: Number(userId), colors: colorsArray });
                }}>Добавить цвета</button>
            </div>

            {error && <div style={{ color: 'red', background: '#ffeeee', padding: 10, margin: 10 }}>Ошибка: {error}</div>}
            {result && (
                <div style={{ background: '#eeffee', padding: 10, margin: 10 }}>
                    <b>Ответ сервера:</b>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;