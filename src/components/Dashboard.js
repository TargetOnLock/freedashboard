// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rewards from './Rewards';
import { formatCurrency } from '../utils/formatCurrency';

const Dashboard = ({ address }) => {
    const [tokenPrice, setTokenPrice] = useState(0);
    const [btcPrice, setBtcPrice] = useState(0);
    const [rewardsDistributed, setRewardsDistributed] = useState(0);
    const [userEarnings, setUserEarnings] = useState(0);

    useEffect(() => {
        const fetchTokenPrice = async () => {
            try {
                const response = await axios.get('API_URL_FOR_TOKEN_PRICE');
                setTokenPrice(response.data.price);
            } catch (error) {
                console.error("Error fetching token price:", error);
            }
        };

        const fetchBtcPrice = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
                setBtcPrice(response.data.bitcoin.usd);
            } catch (error) {
                console.error("Error fetching BTC price:", error);
            }
        };

        const fetchRewardsData = async () => {
            try {
                const response = await axios.get('https://api.basescan.org/api?module=account&action=txlist&address=YOUR_CONTRACT_ADDRESS&startblock=0&endblock=99999999&sort=asc&apikey=YOUR_API_KEY');
                const totalDistributed = response.data.result.reduce((acc, tx) => acc + parseFloat(tx.value), 0);
                setRewardsDistributed(totalDistributed);
                setUserEarnings(calculateUserEarnings(response.data.result));
            } catch (error) {
                console.error("Error fetching rewards data:", error);
            }
        };

        fetchTokenPrice();
        fetchBtcPrice();
        fetchRewardsData();
    }, []);

    const calculateUserEarnings = (transactions) => {
        let earnings = 0;
        transactions.forEach(tx => {
            if (tx.from === 'YOUR_USER_ADDRESS') {
                earnings += parseFloat(tx.value);
            }
        });
        return earnings;
    };

    const handleClaimRewards = () => {
        if (userEarnings <= 0) {
            alert("You have no rewards to claim.");
        } else {
            alert(`You have claimed ${formatCurrency(userEarnings)} in rewards!`);
            setUserEarnings(0);
        }
    };

    return (
        <div className="dashboard-container">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" style={{ width: '500px', marginBottom: '20px' }} />
            {address && <h2>Connected Wallet: {address}</h2>}
            <h2>Token Price: {formatCurrency(tokenPrice)}</h2>
            <h2>Wrapped BTC Price: {formatCurrency(btcPrice)}</h2>
            <h2>Total Rewards Distributed: {formatCurrency(rewardsDistributed)}</h2>
            <h2>Your Earnings: {formatCurrency(userEarnings)}</h2>
            <button onClick={handleClaimRewards}>Claim Rewards</button>
            <Rewards />
        </div>
    );
};

export default Dashboard;