import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Expense } from '@/types/expense';

const EXPENSES_STORAGE_KEY = '@expense_tracker/expenses';

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined
);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load expenses from local storage
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem(
          EXPENSES_STORAGE_KEY
        );

        if (storedExpenses !== null) {
          const parsedExpenses: Expense[] =
            JSON.parse(storedExpenses);

          if (!Array.isArray(parsedExpenses)) {
            throw new Error('Stored expenses must be an array.');
          }

          setExpenses(parsedExpenses);
        }

        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load expenses:', error);
      }
    };

    loadExpenses();
  }, []);

  // Save expenses after the initial load completes
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const saveExpenses = async () => {
      try {
        await AsyncStorage.setItem(
          EXPENSES_STORAGE_KEY,
          JSON.stringify(expenses)
        );
      } catch (error) {
        console.error('Failed to save expenses:', error);
      }
    };

    saveExpenses();
  }, [expenses, isLoaded]);

  const addExpense = (expense: Expense) => {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      expense,
    ]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((currentExpenses) =>
      currentExpenses.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter(
        (expense) => expense.id !== id
      )
    );
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
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