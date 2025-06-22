import React from 'react';
import { ClipboardList, Plus, RefreshCw } from 'lucide-react';
import { TaskFilter } from '../types';

interface EmptyStateProps {
  filters: TaskFilter;
  onAddTask: () => void;
  onResetFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ filters, onAddTask, onResetFilters }) => {
  const isFiltering = 
    filters.status !== 'all' || 
    filters.priority !== 'all' || 
    filters.category !== '' || 
    filters.search !== '';

  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
        <ClipboardList className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      
      <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">
        {isFiltering ? 'No matching tasks found' : 'No tasks yet'}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-sm mx-auto">
        {isFiltering 
          ? 'Try adjusting your filters to find what you\'re looking for'
          : 'Get started by creating your first task'}
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {isFiltering ? (
          <button
            onClick={onResetFilters}
            className="flex items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Filters
          </button>
        ) : null}
        
        <button
          onClick={onAddTask}
          className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default EmptyState;