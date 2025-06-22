import React from 'react';
import { Search, Filter, SlidersHorizontal, CheckSquare, ListTodo } from 'lucide-react';
import { TaskFilter } from '../types';

interface FilterBarProps {
  filters: TaskFilter;
  categories: string[];
  onFilterChange: (filters: Partial<TaskFilter>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, categories, onFilterChange }) => {
  const handleStatusChange = (status: 'all' | 'active' | 'completed') => {
    onFilterChange({ status });
  };
  
  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ priority: event.target.value as TaskFilter['priority'] });
  };
  
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ category: event.target.value });
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: event.target.value });
  };
  
  const handleResetFilters = () => {
    onFilterChange({
      status: 'all',
      priority: 'all',
      category: '',
      search: ''
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleStatusChange('all')}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center 
                        ${filters.status === 'all'
                           ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                           : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5 mr-1" />
              All
            </button>
            <button
              onClick={() => handleStatusChange('active')}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center
                        ${filters.status === 'active'
                           ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                           : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
            >
              <ListTodo className="h-3.5 w-3.5 mr-1" />
              Active
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center
                        ${filters.status === 'completed'
                           ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                           : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
            >
              <CheckSquare className="h-3.5 w-3.5 mr-1" />
              Completed
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-500 mr-1" />
              <select
                value={filters.priority}
                onChange={handlePriorityChange}
                className="text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            {categories.length > 0 && (
              <select
                value={filters.category}
                onChange={handleCategoryChange}
                className="text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
            
            <button
              onClick={handleResetFilters}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;