import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useExpenses } from '@/context/ExpenseContext';
import type { Expense } from '@/types/expense';
import { categories } from '@/constants/categories';

export default function EditExpenseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    expenses,
    updateExpense,
    deleteExpense,
  } = useExpenses();

  const existingExpense = expenses.find(
    (expense) => expense.id === id
  );

  const [amount, setAmount] = useState(
    existingExpense?.amount.toString() ?? ''
  );

  const [category, setCategory] = useState(
    existingExpense?.category ?? ''
  );

  const [date, setDate] = useState(
    existingExpense?.date ?? ''
  );

  const [description, setDescription] = useState(
    existingExpense?.description ?? ''
  );

  const [error, setError] = useState('');

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  if (!existingExpense) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>
            Expense not found.
          </Text>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>
              Go Back
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

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
      setError('Please select a category.');
      return;
    }

    if (!date.trim()) {
      setError('Please enter a date.');
      return;
    }

    setError('');

    const updatedExpense: Expense = {
      id: existingExpense.id,
      amount: numericAmount,
      category: category.trim(),
      date: date.trim(),
      description: description.trim(),
    };

    updateExpense(updatedExpense);

    router.back();
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    deleteExpense(existingExpense.id);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Edit Expense</Text>

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

          <View style={styles.categoryContainer}>
            {categories.map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.categoryButton,
                  category === item &&
                  styles.categoryButtonSelected,
                ]}
                onPress={() => setCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    category === item &&
                    styles.categoryButtonTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
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
            style={[
              styles.input,
              styles.descriptionInput,
            ]}
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
            Save Changes
          </Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>
            Delete Expense
          </Text>
        </Pressable>
      </ScrollView>
      {showDeleteConfirmation && (
        <View style={styles.confirmationOverlay}>
          <View style={styles.confirmationBox}>
            <Text style={styles.confirmationTitle}>
              Delete Expense
            </Text>

            <Text style={styles.confirmationMessage}>
              Are you sure you want to delete this expense?
            </Text>

            <View style={styles.confirmationButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setShowDeleteConfirmation(false)}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={styles.confirmDeleteButton}
                onPress={confirmDelete}
              >
                <Text style={styles.confirmDeleteButtonText}>
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
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

  errorMessage: {
    color: '#cc0000',
    fontSize: 15,
    marginBottom: 16,
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

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 20,
  },

  categoryButtonSelected: {
    backgroundColor: '#222222',
    borderColor: '#222222',
  },

  categoryButtonText: {
    fontSize: 15,
    color: '#333333',
  },

  categoryButtonTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
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

  notFoundContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notFoundText: {
    fontSize: 18,
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: '#222222',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },

  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  deleteButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#cc0000',
  },

  deleteButtonText: {
    color: '#cc0000',
    fontSize: 18,
    fontWeight: 'bold',
  },

  confirmationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  confirmationBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
  },

  confirmationTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 12,
  },

  confirmationMessage: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 24,
  },

  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },

  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
  },

  cancelButtonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },

  confirmDeleteButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#cc0000',
  },

  confirmDeleteButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});