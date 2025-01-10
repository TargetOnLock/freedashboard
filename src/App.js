// src/App.js
import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';


const App = () => {
    const [address, setAddress] = useState('');

    return (
        <div className="App">
           
            <Dashboard address={address} />
        </div>
    );
};

export default App;