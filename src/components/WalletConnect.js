// src/components/WalletConnect.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

const WalletConnect = ({ setAddress }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [address, setAddressState] = useState('');

    const connectWallet = async () => {
        const web3Modal = new Web3Modal({
            cacheProvider: true, // optional
            providerOptions: {} // Add any wallet provider options here if needed
        });

        try {
            const instance = await web3Modal.connect();
            const provider = new ethers.BrowserProvider(instance);
            const signer = provider.getSigner();
            const address = await signer.getAddress();

            setProvider(provider);
            setSigner(signer);
            setAddressState(address);
            setAddress(address);
        } catch (error) {
            console.error("Could not connect to wallet:", error);
        }
    };

    const disconnectWallet = async () => {
        const web3Modal = new Web3Modal();
        await web3Modal.clearCachedProvider();
        setProvider(null);
        setSigner(null);
        setAddressState('');
        setAddress('');
    };

    return (
        <div>
            {address ? (
                <div>
                    <button onClick={disconnectWallet}>Disconnect</button>
                    <p>Connected Wallet: ...{address.slice(-4)}</p>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletConnect;