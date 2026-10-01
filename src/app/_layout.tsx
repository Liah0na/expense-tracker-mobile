import { Stack } from 'expo-router';
import { ExpenseProvider } from '@/context/ExpenseContext';

export default function RootLayout() {
  return (
    <ExpenseProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Expense Tracker',
          }}
        />

        <Stack.Screen
          name="expense/add"
          options={{
            title: 'Add Expense',
          }}
        />
      </Stack>
    </ExpenseProvider>
  );
}