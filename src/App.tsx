import React from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <TaskList />
          </main>
          <footer className="py-4 px-4 mt-auto text-center text-sm text-gray-500 dark:text-gray-400">
            <p>TaskFlow &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;