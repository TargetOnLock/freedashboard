// src/App.js
import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import WalletConnect from './components/WalletConnect';

const App = () => {
    const [address, setAddress] = useState('');

    return (
        <div className="App">
            <WalletConnect setAddress={setAddress} />
            <Dashboard address={address} />
        </div>
    );
};

export default App;