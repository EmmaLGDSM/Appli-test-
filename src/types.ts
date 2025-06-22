export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: string | null;
  createdAt: string;
}

export type TaskFilter = {
  status: 'all' | 'active' | 'completed';
  priority: 'all' | 'low' | 'medium' | 'high';
  category: string;
  search: string;
};

export type ThemeMode = 'light' | 'dark';