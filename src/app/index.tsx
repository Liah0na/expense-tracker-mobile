import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExpenses } from '@/context/ExpenseContext';

export default function HomeScreen() {
  const { expenses } = useExpenses();
  const totalSpent = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Expense Tracker</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Spent</Text>
          <Text style={styles.total}>
            R$ {totalSpent.toFixed(2)}
          </Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push('/expense/add')}
        >
          <Text style={styles.addButtonText}>+ Add Expense</Text>
        </Pressable>

        <View style={styles.expensesSection}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>

          {expenses.length === 0 ? (
            <Text style={styles.emptyMessage}>
              No expenses yet.
            </Text>
          ) : (
            expenses.map((expense) => (
              <Pressable
                key={expense.id}
                style={styles.expenseItem}
                onPress={() => router.push(`/expense/${expense.id}`)}
              >
                <View>
                  <Text style={styles.expenseCategory}>
                    {expense.category}
                  </Text>

                  <Text style={styles.expenseDescription}>
                    {expense.description || 'No description'}
                  </Text>
                </View>

                <Text style={styles.expenseAmount}>
                  R$ {expense.amount.toFixed(2)}
                </Text>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    padding: 24,
    paddingBottom: 40,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  summaryCard: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#eeeeee',
    marginBottom: 20,
  },

  summaryLabel: {
    fontSize: 16,
    marginBottom: 8,
  },

  total: {
    fontSize: 36,
    fontWeight: 'bold',
  },

  addButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#222222',
    alignItems: 'center',
    marginBottom: 32,
  },

  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  expensesSection: {
    width: '100%',
    marginTop: 8,
    paddingBottom: 40,
  },

  sectionTitle: {
    width: '100%',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#222222',
  },

  emptyMessage: {
    width: '100%',
    fontSize: 16,
    lineHeight: 24,
    color: '#555555',
  },

  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 12,
  },

  expenseCategory: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
  },

  expenseDescription: {
    marginTop: 4,
    fontSize: 14,
    color: '#666666',
  },

  expenseAmount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
  },
});