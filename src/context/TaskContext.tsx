import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskFilter } from '../types';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  reorderTasks: (taskList: Task[]) => void;
  filters: TaskFilter;
  setFilters: React.Dispatch<React.SetStateAction<TaskFilter>>;
  filteredTasks: Task[];
  categories: string[];
}

const initialFilters: TaskFilter = {
  status: 'all',
  priority: 'all',
  category: '',
  search: '',
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [filters, setFilters] = useState<TaskFilter>(initialFilters);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const updateTask = (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const reorderTasks = (taskList: Task[]) => {
    setTasks(taskList);
  };

  // Generate unique categories from tasks
  const categories = Array.from(new Set(tasks.map((task) => task.category)))
    .filter(Boolean)
    .sort();

  // Apply filters
  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    if (filters.status === 'active' && task.completed) return false;
    if (filters.status === 'completed' && !task.completed) return false;
    
    // Filter by priority
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    
    // Filter by category
    if (filters.category && task.category !== filters.category) return false;
    
    // Filter by search term
    if (filters.search && 
        !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !task.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        reorderTasks,
        filters,
        setFilters,
        filteredTasks,
        categories,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};