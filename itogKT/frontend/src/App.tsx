import React, { useState } from 'react';
import axios from 'axios';

interface Answer {
    message?: string;
    error?: string;
    id?: number;
    exists?: boolean;
    number?: number;
}

function App() {

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [petName, setPetName] = useState<string>('');
    const [colorText, setColorText] = useState<string>('');
    const [serverAnswer, setServerAnswer] = useState<Answer | null>(null);
    const [errorText, setErrorText] = useState<string>('');

    const sendRequest = async (endpoint: string, data: any) => {
        try {
            const response = await axios.post('http://localhost:5000/api/' + endpoint, data);
            setServerAnswer(response.data);
            setErrorText('');
        } catch (err: any) {
            setErrorText(err.response?.data?.error || 'Ошибка');
            setServerAnswer(null);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Моя работа</h2>
            <p>Студент: Мишка</p>
            <hr />

            {/* 1. Регистрация */}
            <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                <b>1. Регистрация</b><br />
                <input 
                    placeholder="Имя" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <button onClick={() => sendRequest('sign', { name })}>
                    Зарегистрироваться
                </button>
            </div>

            {/* 2. Проверка */}
            <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                <b>2. Проверка</b><br />
                <input 
                    placeholder="Имя" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <button onClick={() => sendRequest('check', { name })}>
                    Проверить
                </button>
            </div>

            {/* 3. Создать/обновить */}
            <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                <b>3. Создать или добавить фамилию</b><br />
                <input 
                    placeholder="Имя" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    placeholder="Фамилия" 
                    value={surname} 
                    onChange={(e) => setSurname(e.target.value)} 
                />
                <button onClick={() => sendRequest('create', { name, surname })}>
                    Выполнить
                </button>
            </div>

            {/* 4. Питомец */}
            <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                <b>4. Добавить питомца</b><br />
                <input 
                    type="number" 
                    placeholder="Номер" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                />
                <input 
                    placeholder="Питомец" 
                    value={petName} 
                    onChange={(e) => setPetName(e.target.value)} 
                />
                <button onClick={() => sendRequest('pet', { id: Number(userId), pet: petName })}>
                    Добавить
                </button>
            </div>

            {/* 5. Цвета */}
            <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                <b>5. Добавить цвета</b><br />
                <input 
                    type="number" 
                    placeholder="Номер" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                />
                <input 
                    placeholder="Цвета через запятую" 
                    value={colorText} 
                    onChange={(e) => setColorText(e.target.value)} 
                />
                <button onClick={() => {
                    const colorsArr: string[] = colorText.split(',').map(c => c.trim());
                    sendRequest('colors', { id: Number(userId), colors: colorsArr });
                }}>
                    Добавить цвета
                </button>
            </div>

            {/* Вывод ошибки */}
            {errorText && (
                <div style={{ color: 'red', background: '#ffe0e0', padding: '10px', margin: '10px' }}>
                    ❌ {errorText}
                </div>
            )}

            {/* Вывод ответа */}
            {serverAnswer && (
                <div style={{ background: '#e0ffe0', padding: '10px', margin: '10px' }}>
                    <b>✅ Ответ сервера:</b>
                    <pre>{JSON.stringify(serverAnswer, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;