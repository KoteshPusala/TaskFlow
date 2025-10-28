import React, { createContext, useState, useContext, useEffect } from 'react';
import { todoService } from '../services/todoService';
import { useAuth } from './AuthContext';

const TodoContext = createContext();

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priority: '',
    completed: '',
    search: ''
  });
  const [stats, setStats] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  
  const { user } = useAuth();

  // Fetch todos function
  const fetchTodos = async () => {
    if (!user) {
      setTodos([]);
      setHasFetched(false);
      return;
    }
    
    console.log('🔄 Fetching todos for user:', user._id);
    setLoading(true);
    try {
      const todosData = await todoService.getTodos(filters);
      console.log('✅ Todos fetched:', todosData?.length || 0, 'todos');
      setTodos(todosData || []);
      setHasFetched(true);
    } catch (error) {
      console.error('❌ Error fetching todos:', error);
      setTodos([]);
      setHasFetched(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats function
  const fetchStats = async () => {
    if (!user) {
      setStats(null);
      return;
    }
    
    try {
      const statsData = await todoService.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      setStats(null);
    }
  };

  // Load todos when user changes OR when filters change
  useEffect(() => {
    console.log('🎯 User or filters changed - fetching todos and stats');
    
    if (user) {
      // Add a small delay to ensure auth token is set
      const timer = setTimeout(() => {
        fetchTodos();
        fetchStats();
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setTodos([]);
      setStats(null);
      setLoading(false);
      setHasFetched(false);
    }
  }, [user, filters]);

  // Add a retry mechanism for initial fetch
  useEffect(() => {
    if (user && !loading && todos.length === 0 && !hasFetched) {
      console.log('🔄 No todos found, retrying fetch...');
      const retryTimer = setTimeout(() => {
        fetchTodos();
      }, 500);
      
      return () => clearTimeout(retryTimer);
    }
  }, [user, loading, todos.length, hasFetched]);

  const addTodo = async (todoData) => {
    try {
      console.log('➕ Adding todo:', todoData);
      const newTodo = await todoService.createTodo(todoData);
      console.log('✅ Todo added successfully:', newTodo);
      
      // Update local state optimistically
      setTodos(prev => [newTodo, ...prev]);
      
      // Refresh stats
      await fetchStats();
      
      return newTodo;
    } catch (error) {
      console.error('❌ Error adding todo:', error);
      throw error;
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, updates);
      setTodos(prev => prev.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
      fetchStats();
      return updatedTodo;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
      fetchStats();
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  };

  const toggleComplete = async (id, completed) => {
    await updateTodo(id, { completed: !completed });
  };

  const clearTodos = () => {
    setTodos([]);
    setStats(null);
    setFilters({
      category: '',
      priority: '',
      completed: '',
      search: ''
    });
    setHasFetched(false);
  };

  const value = {
    todos,
    loading,
    filters,
    stats,
    setFilters,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    clearTodos,
    hasFetched
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};