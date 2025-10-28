import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import TodoForm from './TodoForm';
import { 
  Check, 
  Clock, 
  Flag, 
  Edit3, 
  Trash2, 
  Calendar,
  Tag
} from 'lucide-react';

const TodoItem = ({ todo }) => {
  const { toggleComplete, deleteTodo } = useTodo();
  const [showEditForm, setShowEditForm] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getPriorityBgColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <>
      <div className="p-6 hover:bg-gray-50 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <button
              onClick={() => toggleComplete(todo._id, todo.completed)}
              className={`mt-1 flex-shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                todo.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {todo.completed && <Check className="h-3 w-3 text-white" />}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`text-lg font-medium ${
                  todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                }`}>
                  {todo.title}
                </h3>
                
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityBgColor(todo.priority)}`}>
                  <Flag className={`h-3 w-3 mr-1 ${getPriorityColor(todo.priority)}`} />
                  {todo.priority}
                </span>

                {isOverdue && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <Clock className="h-3 w-3 mr-1" />
                    Overdue
                  </span>
                )}
              </div>

              {todo.description && (
                <p className={`text-gray-600 mb-2 ${
                  todo.completed ? 'line-through' : ''
                }`}>
                  {todo.description}
                </p>
              )}

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {todo.category && (
                  <span className="inline-flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    {todo.category}
                  </span>
                )}

                {todo.dueDate && (
                  <span className={`inline-flex items-center ${
                    isOverdue ? 'text-red-600 font-medium' : ''
                  }`}>
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(todo.dueDate)}
                  </span>
                )}

                {todo.tags && todo.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    {todo.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {todo.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{todo.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => setShowEditForm(true)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => deleteTodo(todo._id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {showEditForm && (
        <TodoForm 
          editTodo={todo} 
          onClose={() => setShowEditForm(false)} 
        />
      )}
    </>
  );
};

export default TodoItem;