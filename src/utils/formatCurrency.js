// src/utils/formatCurrency.js
export const formatCurrency = (value) => {
    if (isNaN(value)) return '$0.00'; // Handle NaN values
    return `$${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};