function initUserBalance(): number {
    const stored = localStorage.getItem('balance');
    const balance = stored ? Number(stored) : 10000;

    if (Number.isNaN(balance) || balance < 0) return 10000;

    return balance;
}

function updateBalanceInStorage(balance: number): void {
    localStorage.setItem('balance', balance.toString());
}

function validateNewBalanceValue(balanceValue: unknown): asserts balanceValue is number {
    if (typeof balanceValue !== 'number' || Number.isNaN(balanceValue)) {
        throw new Error('Balance must be a valid number.');
    }

    if (balanceValue < 0) {
        throw new Error("Balance value can't be less than zero.");
    }
}


export { initUserBalance, updateBalanceInStorage, validateNewBalanceValue }