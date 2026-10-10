# Expense Tracker Mobile

## Overview

Expense Tracker Mobile is a cross-platform application designed to help users record, organize, and track their personal expenses. The application provides a simple and intuitive interface for managing daily spending, reviewing expenses by category, and understanding how money is being spent.

Users can add expenses by entering an amount, selecting a category, choosing a date, and optionally providing a description. Existing expenses can be edited or deleted, making it easy to keep records accurate and up to date.

The home screen displays the total amount spent and an Expense Summary that groups expenses by category. The summary includes the amount spent in each category and its percentage of the overall total. Users can show or hide the summary and filter their expense list by category to find specific records more easily.

Expense data is saved locally on the device or browser, allowing users to close and reopen the application without losing their saved records. The application supports both Android and Web platforms.

The purpose of this project is to strengthen my software engineering skills by building a practical mobile application with a focus on component-based development, state management, data persistence, form validation, and cross-platform compatibility. It has also provided an opportunity to improve my understanding of application architecture, user experience, and code organization.

### How to Use the Application

1. Open the application to view your total spending and recent expenses.
2. Select **+ Add Expense** to record a new expense.
3. Enter the amount, choose a category, confirm the date, and optionally add a description.
4. Select an existing expense to edit its information or delete it.
5. Use **Filter by Category** to display expenses from a specific category.
6. Expand or collapse **Expense Summary** to review spending by category and its percentage of the total.
7. Close and reopen the application to verify that your saved expenses remain available in the same browser or device.

### Software Demonstration

The demonstration video presents the application running, explains its main features, and walks through the implementation.

[Watch the Expense Tracker Mobile demonstration on YouTube](https://youtu.be/chnK4Nh9N44)

## Development Environment

The application was developed using the following tools and technologies:

- **Operating System:** Ubuntu Linux
- **Code Editor:** Visual Studio Code
- **Runtime and Package Manager:** Node.js and npm
- **Development Framework:** Expo
- **Navigation:** Expo Router
- **Programming Language:** TypeScript
- **UI Framework:** React Native
- **Web Support:** React Native Web
- **Local Data Persistence:** AsyncStorage
- **Version Control:** Git and GitHub

### Libraries and Technologies

- **React:** Used to build the component-based user interface and manage application state.
- **React Native:** Provides cross-platform UI components for Android and other supported platforms.
- **Expo:** Simplifies application development, testing, and execution across platforms.
- **Expo Router:** Manages file-based navigation between the home screen, add expense screen, and edit expense screen.
- **React Native AsyncStorage:** Stores expense records locally so they persist between application sessions.
- **React Native Safe Area Context:** Helps position application content within safe screen areas.
- **TypeScript:** Adds static typing to improve code reliability, maintainability, and developer productivity.

The application uses React state and a shared context to manage expense records across screens. Expenses are stored locally using AsyncStorage, avoiding the need for a remote database or backend service for the current implementation.

## Useful Websites

The following resources were helpful during development:

- [Expo Documentation](https://docs.expo.dev/) — Guides for creating, running, and testing cross-platform applications.
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/) — Documentation for file-based navigation.
- [React Native Documentation](https://reactnative.dev/docs/getting-started) — Reference for UI components, styling, and platform-specific behavior.
- [React Documentation](https://react.dev/) — Guidance on components, hooks, state, and context.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) — Reference for types and static type checking.
- [React Native AsyncStorage](https://react-native-async-storage.github.io/async-storage/) — Documentation for local persistent storage.
- [Androi Studio Emulator](https://developer.android.com/) - For Adroid emulator. But this tool needs high memory performance.
- [Expo](https://expo.dev/go) - This tool must be installed on Android device in order to allow test our project on mobile device.
- [Git Documentation](https://git-scm.com/doc) — Reference for version control and source code management.
- [GitHub Documentation](https://docs.github.com/) — Guidance for repository management and collaboration.

## Future Work

- **Expense Analytics:** Add charts and visual reports to help users identify spending patterns over time.
- **Date-Based Filtering:** Allow users to filter expenses by day, month, or custom date range.
- **Data Export and Backup:** Provide options to export expense records to CSV or JSON for backup and analysis.
- **Improved User Experience:** Add currency formatting preferences, clearer feedback messages, and additional accessibility improvements.
- **Automated Testing:** Introduce unit and component tests to improve reliability and prevent regressions.
- **Enhanced Data Management:** Explore secure backup and synchronization options so users can access their records across multiple devices.