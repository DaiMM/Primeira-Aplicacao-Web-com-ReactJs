import { AxiosResponse } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';


interface Transaction {
    id: string,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string
}

/* interface TransactionInput{
    title: string,
    amount: number,
    type: string,
    category: string,
} */

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

// type Pick faz o contrário do Omit

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}
export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    )


export function TransactionsProvider ({ children } : TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    
    useEffect(() => {
        api.get('/transactions')
        .then((response : AxiosResponse) => setTransactions(response.data.transactions))
    }, []);

async function createTransaction(transactionInput: TransactionInput){
    const response = await api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date(),
    });

    const { transaction } = response.data;
    setTransactions([...transactions, transaction,]);
}
    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}