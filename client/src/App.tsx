import React, { useState } from 'react';
import './index.scss';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

import ButtonAppBar from './components/ButtonAppBar';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const App: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [user_id, setUser_id] = useState<string>("");
    const [user, setUser] = useState<object | null>(null);

    return (
        <Router>
            <Routes>
                <Route  path='/login' element={<Login username={username} setUsername={setUsername} setUser_id={setUser_id}/>} />
                <Route  path='/signup' element={<Signup username={username} setUsername={setUsername} />} />
                <Route  path='/home' element={<Home user_id={user_id} />} />
            </Routes>
        </Router>
    )

}


export default App;