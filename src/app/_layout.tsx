import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
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
  );
}