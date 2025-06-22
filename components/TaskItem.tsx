import React from 'react';
import { CheckCircle, Circle, Trash2, Edit, CalendarIcon } from 'lucide-react';
import { Task } from '../types';
import { formatDate } from '../utils/dateUtils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const priorityClasses = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div 
      className={`group p-4 mb-3 rounded-lg transition-all duration-300 border shadow-sm hover:shadow-md
        ${task.completed 
          ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' 
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}
    >
      <div className="flex items-start gap-3">
        <button 
          onClick={() => onToggle(task.id)}
          className="mt-0.5 flex-shrink-0 transition-colors duration-200 text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400"
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? (
            <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>
        
        <div className="flex-grow min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 
              className={`font-medium text-gray-900 dark:text-gray-100 truncate ${
                task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
              }`}
            >
              {task.title}
            </h3>
            
            {task.category && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                {task.category}
              </span>
            )}
            
            <span className={`px-2 py-0.5 text-xs rounded-full ${priorityClasses[task.priority]}`}>
              {task.priority}
            </span>
          </div>
          
          {task.description && (
            <p className={`text-sm text-gray-600 dark:text-gray-300 mb-2 ${
              task.completed ? 'text-gray-400 dark:text-gray-500' : ''
            }`}>
              {task.description}
            </p>
          )}
          
          {task.dueDate && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <CalendarIcon className="w-3 h-3 mr-1" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 transition-colors"
            aria-label="Edit task"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;