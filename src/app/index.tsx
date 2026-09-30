import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Expense Tracker</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Spent</Text>
          <Text style={styles.total}>$0.00</Text>
        </View>

        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Expense</Text>
        </Pressable>

        <View style={styles.expensesSection}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>

          <Text style={styles.emptyMessage}>
            No expenses yet.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 24,
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
    flex: 1,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  emptyMessage: {
    fontSize: 16,
  },
});