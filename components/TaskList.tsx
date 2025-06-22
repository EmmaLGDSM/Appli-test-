import React, { useState } from 'react';
import { PlusCircle, Sparkles } from 'lucide-react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import FilterBar from './FilterBar';
import { Task } from '../types';
import { useTaskContext } from '../context/TaskContext';
import EmptyState from './EmptyState';

const TaskList: React.FC = () => {
  const {
    filteredTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    filters,
    setFilters,
    categories,
  } = useTaskContext();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowAddForm(false);
  };
  
  const handleAddSubmit = (task: Omit<Task, 'id' | 'createdAt'>) => {
    addTask(task);
    setShowAddForm(false);
  };
  
  const handleEditSubmit = (updatedTask: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, updatedTask);
      setEditingTask(null);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <Sparkles className="h-6 w-6 text-blue-500 mr-2" />
          My Tasks
        </h2>
        <button
          onClick={() => {
            setShowAddForm((prev) => !prev);
            setEditingTask(null);
          }}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <PlusCircle className="h-5 w-5 mr-1" />
          {showAddForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>
      
      <FilterBar 
        filters={filters}
        categories={categories}
        onFilterChange={handleFilterChange}
      />
      
      {showAddForm && (
        <div className="mb-6">
          <TaskForm
            onSubmit={handleAddSubmit}
            onCancel={() => setShowAddForm(false)}
            categories={categories}
          />
        </div>
      )}
      
      {editingTask && (
        <div className="mb-6">
          <TaskForm
            initialTask={editingTask}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingTask(null)}
            categories={categories}
          />
        </div>
      )}
      
      {filteredTasks.length > 0 ? (
        <div className="space-y-1">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTaskCompletion}
              onDelete={deleteTask}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          filters={filters}
          onAddTask={() => setShowAddForm(true)}
          onResetFilters={() => handleFilterChange({
            status: 'all',
            priority: 'all',
            category: '',
            search: '',
          })}
        />
      )}
    </div>
  );
};

export default TaskList;