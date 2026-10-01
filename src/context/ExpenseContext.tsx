import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import type { Expense } from '@/types/expense';

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined
);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      expense,
    ]);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      'useExpenses must be used inside an ExpenseProvider'
    );
  }

  return context;
}