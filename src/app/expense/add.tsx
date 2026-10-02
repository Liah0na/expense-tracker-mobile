import { useState } from 'react';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Expense } from '@/types/expense';
import { useExpenses } from '@/context/ExpenseContext';

export default function AddExpenseScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { addExpense } = useExpenses();
  const handleSave = () => {
    const numericAmount = Number(amount);

    if (!amount.trim()) {
      setError('Please enter an amount.');
      return;
    }

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }

    if (!category.trim()) {
      setError('Please enter a category.');
      return;
    }

    if (!date.trim()) {
      setError('Please enter a date.');
      return;
    }

    setError('');

    const expense: Expense = {
      id: Date.now().toString(),
      amount: numericAmount,
      category: category.trim(),
      date: date.trim(),
      description: description.trim(),
    };

    addExpense(expense);

    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add Expense</Text>

        {error ? (
          <Text style={styles.errorMessage}>
            {error}
          </Text>
        ) : null}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Amount</Text>

          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>

          <TextInput
            style={styles.input}
            placeholder="Food"
            value={category}
            onChangeText={setCategory}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Date</Text>

          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={date}
            onChangeText={setDate}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Optional description"
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <Pressable
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>
            Save Expense
          </Text>
        </Pressable>

        <View style={styles.debugContainer}>
          <Text>Amount: {amount}</Text>
          <Text>Category: {category}</Text>
          <Text>Date: {date}</Text>
          <Text>Description: {description}</Text>
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
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },

  formGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },

  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  saveButton: {
    backgroundColor: '#222222',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },

  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  debugContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    gap: 8,
  },

  errorMessage: {
    color: '#cc0000',
    fontSize: 15,
    marginBottom: 16,
  },
});