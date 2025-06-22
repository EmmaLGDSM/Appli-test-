import React, { useState, useEffect } from 'react';
import { Calendar, Tag, AlertTriangle } from 'lucide-react';
import { Task } from '../types';

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  categories: string[];
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  onSubmit,
  onCancel,
  categories,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setPriority(initialTask.priority);
      setCategory(initialTask.category);
      setDueDate(initialTask.dueDate || '');
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalCategory = showCategoryInput ? newCategory : category;
    
    onSubmit({
      title,
      description,
      completed: initialTask?.completed || false,
      priority,
      category: finalCategory,
      dueDate: dueDate || null,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('');
    setNewCategory('');
    setDueDate('');
    setShowCategoryInput(false);
  };

  const addNewCategory = () => {
    if (newCategory.trim()) {
      setCategory(newCategory);
      setShowCategoryInput(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        {initialTask ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                    dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                    dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="priority" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="dueDate" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <Calendar className="w-4 h-4 mr-1" />
            Due Date (optional)
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          <Tag className="w-4 h-4 mr-1" />
          Category
        </label>
        
        {showCategoryInput ? (
          <div className="flex">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category"
              className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                        dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button 
              type="button"
              onClick={addNewCategory}
              className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </div>
        ) : (
          <div className="flex">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                        dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowCategoryInput(true)}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 transition-colors
                        dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            >
              New
            </button>
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 
                   bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
                   dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                   bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {initialTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;