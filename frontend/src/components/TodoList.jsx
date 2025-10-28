import React from 'react';
import { useTodo } from '../contexts/TodoContext';
import TodoItem from '../TodoItem';
import { Loader, ListTodo } from 'lucide-react';

const TodoList = () => {
  const { todos, loading } = useTodo();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <ListTodo className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No todos</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new todo.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;