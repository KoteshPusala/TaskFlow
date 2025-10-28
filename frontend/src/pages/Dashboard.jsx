import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTodo } from '../contexts/TodoContext';
import Analytics from '../components/Analytics';
import { 
  Plus, 
  LogOut, 
  User, 
  Filter, 
  Search, 
  CheckCircle2, 
  Trash2,
  Edit3,
  Calendar,
  Flag,
  TrendingUp,
  CheckSquare,
  Clock,
  Sun,
  Moon,
  X,
  Sparkles,
  Target,
  Zap,
  BarChart3,
  LayoutDashboard,
  Rocket
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout, updateDarkMode } = useAuth();
  const { 
    todos, 
    loading, 
    filters, 
    stats, 
    setFilters, 
    addTodo, 
    updateTodo, 
    deleteTodo, 
    toggleComplete 
  } = useTodo();
  
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    category: 'personal',
    priority: 'medium',
    dueDate: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    if (user?.darkMode !== undefined) {
      setDarkMode(user.darkMode);
    } else {
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(savedDarkMode);
    }
  }, [user?.darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleThemeChange = async (isDarkMode) => {
    setDarkMode(isDarkMode);
    if (user) {
      try {
        await updateDarkMode(isDarkMode);
        user.darkMode = isDarkMode;
      } catch (error) {
        console.error('Failed to save theme preference:', error);
      }
    } else {
      localStorage.setItem('darkMode', isDarkMode);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      await addTodo(newTodo);
      setNewTodo({
        title: '',
        description: '',
        category: 'personal',
        priority: 'medium',
        dueDate: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleEditTodo = async (e) => {
    e.preventDefault();
    try {
      await updateTodo(editingTodo._id, editingTodo);
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg';
      case 'medium': return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg';
      case 'low': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'work': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'personal': return 'bg-gradient-to-r from-green-500 to-teal-500 text-white';
      case 'shopping': return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white';
      case 'health': return 'bg-gradient-to-r from-rose-500 to-red-500 text-white';
      case 'education': return 'bg-gradient-to-r from-orange-500 to-amber-500 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work': return '💼';
      case 'personal': return '👤';
      case 'shopping': return '🛒';
      case 'health': return '🏥';
      case 'education': return '📚';
      default: return '📝';
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filters.search && !todo.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !todo.description?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.category && todo.category !== filters.category) {
      return false;
    }
    if (filters.priority && todo.priority !== filters.priority) {
      return false;
    }
    if (filters.completed !== '') {
      if (filters.completed === 'true' && !todo.completed) return false;
      if (filters.completed === 'false' && todo.completed) return false;
    }
    return true;
  });

  const todosByCategory = filteredTodos.reduce((acc, todo) => {
    if (!acc[todo.category]) {
      acc[todo.category] = [];
    }
    acc[todo.category].push(todo);
    return acc;
  }, {});

  const categoryOrder = ['work', 'personal', 'shopping', 'health', 'education'];
  const sortedCategories = Object.keys(todosByCategory).sort((a, b) => {
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
  });

  const completedTodos = filteredTodos.filter(todo => todo.completed);
  const pendingTodos = filteredTodos.filter(todo => !todo.completed);

  // Check if any filters are active
  const areFiltersActive = filters.category || filters.priority || filters.completed || filters.search;

  return (
    <div className={`min-h-screen transition-all duration-500 overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 text-gray-900'
    } relative`}>
      
      {/* Animated Background Elements */}
      <div className="Absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/30 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/3 w-6 h-6 bg-purple-400/20 rounded-full animate-float-delay"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-cyan-400/40 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-pink-400/30 rounded-full animate-float-delay-2"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-400/5 to-teal-400/5 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[length:50px_50px] bg-grid-white"></div>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 h-screen flex">
        {/* Sidebar */}
        <div className={`w-80 flex-shrink-0 border-r transition-all duration-500 backdrop-blur-xl ${
          darkMode 
            ? 'bg-gray-900/80 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        } shadow-2xl`}>
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-sm text-gray-500">Productivity Suite</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-2">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${
                activeView === 'dashboard'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveView('analytics')}
              className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${
                activeView === 'analytics'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Analytics</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="p-6 border-t border-gray-700">
            <h3 className={`text-sm font-semibold mb-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Quick Stats</h3>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-3 rounded-xl backdrop-blur-sm ${
                darkMode ? 'bg-gray-800/50' : 'bg-white/50'
              }`}>
                <span className="text-sm">Total Tasks</span>
                <span className="font-bold text-blue-500">{filteredTodos.length}</span>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-xl backdrop-blur-sm ${
                darkMode ? 'bg-gray-800/50' : 'bg-white/50'
              }`}>
                <span className="text-sm">Completed</span>
                <span className="font-bold text-green-500">{completedTodos.length}</span>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-xl backdrop-blur-sm ${
                darkMode ? 'bg-gray-800/50' : 'bg-white/50'
              }`}>
                <span className="text-sm">Pending</span>
                <span className="font-bold text-amber-500">{pendingTodos.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className={`backdrop-blur-xl border-b transition-all duration-500 ${
            darkMode 
              ? 'bg-gray-900/80 border-gray-700' 
              : 'bg-white/80 border-gray-200'
          } shadow-lg`}>
            <div className="flex justify-between items-center h-20 px-8">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome back, {user?.username}!
                </h2>
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm">
                  <Zap className="h-3 w-3" />
                  <span>Pro Plan</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleThemeChange(!darkMode)}
                  className={`p-3 rounded-2xl transition-all duration-300 shadow-lg ${
                    darkMode 
                      ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:scale-110' 
                      : 'bg-gray-800 text-yellow-400 hover:bg-gray-700 hover:scale-110'
                  }`}
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                <button
                  onClick={() => setShowProfileModal(true)}
                  className={`flex items-center space-x-3 rounded-2xl px-4 py-3 transition-all duration-300 hover:shadow-lg ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white shadow-sm border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className={`font-medium ${
                        darkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>{user?.username}</p>
                      <p className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Premium Member</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={logout}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 font-medium shadow-lg hover:scale-105 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:shadow-red-500/25' 
                      : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-red-500/25'
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto">
              {activeView === 'dashboard' ? (
                <>
                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className={`rounded-3xl p-6 backdrop-blur-xl shadow-2xl border transition-all duration-500 hover:scale-105 ${
                      darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-medium ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>Total Tasks</p>
                          <p className="text-3xl font-bold text-blue-500 mt-2">{filteredTodos.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Target className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className={`rounded-3xl p-6 backdrop-blur-xl shadow-2xl border transition-all duration-500 hover:scale-105 ${
                      darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-medium ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>Completed</p>
                          <p className="text-3xl font-bold text-green-500 mt-2">{completedTodos.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className={`rounded-3xl p-6 backdrop-blur-xl shadow-2xl border transition-all duration-500 hover:scale-105 ${
                      darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-medium ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>Pending</p>
                          <p className="text-3xl font-bold text-amber-500 mt-2">{pendingTodos.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Clock className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="xl:col-span-1 space-y-6">
                      <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 ${
                        darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
                      }`}>
                        <div className="flex items-center space-x-3 mb-6">
                          <Filter className={`h-6 w-6 ${
                            darkMode ? 'text-purple-400' : 'text-purple-600'
                          }`} />
                          <h3 className={`text-xl font-bold ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>Filters & Search</h3>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <label className={`block text-sm font-semibold mb-3 ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>Search Tasks</label>
                            <div className="relative">
                              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                                darkMode ? 'text-gray-500' : 'text-gray-400'
                              }`} />
                              <input
                                type="text"
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-lg ${
                                  darkMode 
                                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                    : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                                }`}
                                placeholder="Search tasks..."
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label className={`block text-sm font-semibold mb-2 ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>Category</label>
                              <select
                                value={filters.category}
                                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
                                  darkMode 
                                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                                    : 'bg-white/50 border-gray-300 text-gray-900'
                                }`}
                              >
                                <option value="">All Categories</option>
                                <option value="work">💼 Work</option>
                                <option value="personal">👤 Personal</option>
                                <option value="shopping">🛒 Shopping</option>
                                <option value="health">🏥 Health</option>
                                <option value="education">📚 Education</option>
                              </select>
                            </div>

                            <div>
                              <label className={`block text-sm font-semibold mb-2 ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>Priority</label>
                              <select
                                value={filters.priority}
                                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                                className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
                                  darkMode 
                                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                                    : 'bg-white/50 border-gray-300 text-gray-900'
                                }`}
                              >
                                <option value="">All Priorities</option>
                                <option value="high">🔴 High</option>
                                <option value="medium">🟡 Medium</option>
                                <option value="low">🟢 Low</option>
                              </select>
                            </div>

                            <div>
                              <label className={`block text-sm font-semibold mb-2 ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>Status</label>
                              <select
                                value={filters.completed}
                                onChange={(e) => setFilters(prev => ({ ...prev, completed: e.target.value }))}
                                className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
                                  darkMode 
                                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                                    : 'bg-white/50 border-gray-300 text-gray-900'
                                }`}
                              >
                                <option value="">All Tasks</option>
                                <option value="true">✅ Completed</option>
                                <option value="false">⏳ Pending</option>
                              </select>
                            </div>
                          </div>

                          <button
                            onClick={() => setFilters({ category: '', priority: '', completed: '', search: '' })}
                            className={`w-full py-4 px-6 rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:scale-105 ${
                              darkMode 
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            🗑️ Clear Filters
                          </button>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 ${
                        darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
                      }`}>
                        <h3 className={`text-lg font-semibold mb-4 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>Quick Actions</h3>
                        <button
                          onClick={() => setShowAddForm(true)}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold flex items-center justify-center space-x-3"
                        >
                          <Plus className="h-5 w-5" />
                          <span>Add New Task</span>
                        </button>
                      </div>
                    </div>

                    {/* Tasks Area */}
                    <div className="xl:col-span-3 space-y-8">
                      {/* Header */}
                      <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-8 transition-all duration-500 ${
                        darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
                      }`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <h2 className={`text-3xl font-bold ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>Your Tasks</h2>
                            <p className={`mt-2 ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {filteredTodos.length} tasks • {pendingTodos.length} pending • {completedTodos.length} completed
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className={`px-4 py-2 rounded-2xl ${
                              darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                            }`}>
                              <span className="font-semibold">{Math.round((completedTodos.length / filteredTodos.length) * 100) || 0}% Complete</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Add Task Form */}
                      {showAddForm && (
                        <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-8 animate-slide-up transition-all duration-500 ${
                          darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
                        }`}>
                          <h3 className={`text-2xl font-bold mb-6 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>✨ Create New Task</h3>
                          <form onSubmit={handleAddTodo} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className={`block text-sm font-semibold mb-3 ${
                                  darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>Title *</label>
                                <input
                                  type="text"
                                  required
                                  value={newTodo.title}
                                  onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
                                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg ${
                                    darkMode 
                                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                      : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                                  }`}
                                  placeholder="What needs to be done?"
                                />
                              </div>
                              <div>
                                <label className={`block text-sm font-semibold mb-3 ${
                                  darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>Category</label>
                                <select
                                  value={newTodo.category}
                                  onChange={(e) => setNewTodo(prev => ({ ...prev, category: e.target.value }))}
                                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                                    darkMode 
                                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                                      : 'bg-white/50 border-gray-300 text-gray-900'
                                  }`}
                                >
                                  <option value="personal">👤 Personal</option>
                                  <option value="work">💼 Work</option>
                                  <option value="shopping">🛒 Shopping</option>
                                  <option value="health">🏥 Health</option>
                                  <option value="education">📚 Education</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className={`block text-sm font-semibold mb-3 ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>Description</label>
                              <textarea
                                value={newTodo.description}
                                onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
                                rows="3"
                                className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                                  darkMode 
                                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                    : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                                }`}
                                placeholder="Add some details..."
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <label className={`block text-sm font-semibold mb-3 ${
                                  darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>Priority</label>
                                <select
                                  value={newTodo.priority}
                                  onChange={(e) => setNewTodo(prev => ({ ...prev, priority: e.target.value }))}
                                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                                    darkMode 
                                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                                      : 'bg-white/50 border-gray-300 text-gray-900'
                                  }`}
                                >
                                  <option value="low">🟢 Low</option>
                                  <option value="medium">🟡 Medium</option>
                                  <option value="high">🔴 High</option>
                                </select>
                              </div>
                              <div>
                                <label className={`block text-sm font-semibold mb-3 ${
                                  darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>Due Date</label>
                                <input
                                  type="date"
                                  value={newTodo.dueDate}
                                  onChange={(e) => setNewTodo(prev => ({ ...prev, dueDate: e.target.value }))}
                                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                                    darkMode 
                                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                                      : 'bg-white/50 border-gray-300 text-gray-900'
                                  }`}
                                />
                              </div>
                            </div>

                            <div className="flex justify-end space-x-4 pt-6">
                              <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className={`px-8 py-4 border-2 rounded-2xl transition-all duration-300 font-semibold hover:scale-105 ${
                                  darkMode 
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
                              >
                                🚀 Add Task
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Edit Task Form */}
                      {editingTodo && (
                        <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-8 animate-slide-up transition-all duration-500 ${
                          darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
                        }`}>
                          <h3 className={`text-2xl font-bold mb-6 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>✏️ Edit Task</h3>
                          <form onSubmit={handleEditTodo} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className={`block text-sm font-semibold mb-3 ${
                                  darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>Title *</label>
                                <input
                                  type="text"
                                  required
                                  value={editingTodo.title}
                                  onChange={(e) => setEditingTodo(prev => ({ ...prev, title: e.target.value }))}
                                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg ${
                                    darkMode 
                                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                      : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                                  }`}
                                  placeholder="What needs to be done?"
                                />
                              </div>
                              <div>
                                <label className={`block text-sm font-semibold mb-3 ${
                                  darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>Category</label>
                                <select
                                  value={editingTodo.category}
                                  onChange={(e) => setEditingTodo(prev => ({ ...prev, category: e.target.value }))}
                                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                                    darkMode 
                                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                                      : 'bg-white/50 border-gray-300 text-gray-900'
                                  }`}
                                >
                                  <option value="personal">👤 Personal</option>
                                  <option value="work">💼 Work</option>
                                  <option value="shopping">🛒 Shopping</option>
                                  <option value="health">🏥 Health</option>
                                  <option value="education">📚 Education</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className={`block text-sm font-semibold mb-3 ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>Description</label>
                              <textarea
                                value={editingTodo.description}
                                onChange={(e) => setEditingTodo(prev => ({ ...prev, description: e.target.value }))}
                                rows="3"
                                className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                                  darkMode 
                                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                    : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                                }`}
                                placeholder="Add some details..."
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <label className={`block text-sm font-semibold mb-3 ${
                                  darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>Priority</label>
                                <select
                                  value={editingTodo.priority}
                                  onChange={(e) => setEditingTodo(prev => ({ ...prev, priority: e.target.value }))}
                                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                                    darkMode 
                                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                                      : 'bg-white/50 border-gray-300 text-gray-900'
                                  }`}
                                >
                                  <option value="low">🟢 Low</option>
                                  <option value="medium">🟡 Medium</option>
                                  <option value="high">🔴 High</option>
                                </select>
                              </div>
                              <div>
                                <label className={`block text-sm font-semibold mb-3 ${
                                  darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>Due Date</label>
                                <input
                                  type="date"
                                  value={editingTodo.dueDate}
                                  onChange={(e) => setEditingTodo(prev => ({ ...prev, dueDate: e.target.value }))}
                                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                                    darkMode 
                                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                                      : 'bg-white/50 border-gray-300 text-gray-900'
                                  }`}
                                />
                              </div>
                              <div>
                                <label className={`block text-sm font-semibold mb-3 ${
                                  darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>Status</label>
                                <select
                                  value={editingTodo.completed}
                                  onChange={(e) => setEditingTodo(prev => ({ ...prev, completed: e.target.value === 'true' }))}
                                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                                    darkMode 
                                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                                      : 'bg-white/50 border-gray-300 text-gray-900'
                                  }`}
                                >
                                  <option value="false">Pending</option>
                                  <option value="true">Completed</option>
                                </select>
                              </div>
                            </div>

                            <div className="flex justify-end space-x-4 pt-6">
                              <button
                                type="button"
                                onClick={() => setEditingTodo(null)}
                                className={`px-8 py-4 border-2 rounded-2xl transition-all duration-300 font-semibold hover:scale-105 ${
                                  darkMode 
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
                              >
                                Update Task
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Tasks List */}
                      <div className="space-y-8">
                        {loading ? (
                          <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-12 text-center transition-all duration-500 ${
                            darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
                          }`}>
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
                            <p className={`mt-6 text-xl ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>Loading your tasks...</p>
                          </div>
                        ) : filteredTodos.length === 0 ? (
                          <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-16 text-center transition-all duration-500 ${
                            darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
                          }`}>
                            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                              <CheckCircle2 className="h-10 w-10 text-white" />
                            </div>
                            <h3 className={`text-2xl font-bold mb-4 ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>No tasks found</h3>
                            <p className={`text-lg mb-8 ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {todos.length === 0 ? 'Get started by creating your first task!' : 'No tasks match your current filters'}
                            </p>
                            
                            {/* Only show Create button when there are no tasks at all AND no filters are active */}
                            {todos.length === 0 && !areFiltersActive && (
                              <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:scale-105"
                              >
                                🎯 Create Your First Task
                              </button>
                            )}
                            
                            {/* Show Clear Filters button when filters are active but return no results */}
                            {areFiltersActive && (
                              <button
                                onClick={() => setFilters({ category: '', priority: '', completed: '', search: '' })}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:scale-105"
                              >
                                🗑️ Clear Filters
                              </button>
                            )}
                          </div>
                        ) : (
                          <>
                            {/* Group tasks by category */}
                            {sortedCategories.map((category) => {
                              const categoryTodos = todosByCategory[category];
                              const completedCategoryTodos = categoryTodos.filter(todo => todo.completed);
                              const pendingCategoryTodos = categoryTodos.filter(todo => !todo.completed);

                              return (
                                <div key={category} className="space-y-6">
                                  {/* Category Header */}
                                  <div className={`rounded-3xl p-6 backdrop-blur-xl shadow-2xl border transition-all duration-500 ${
                                    darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
                                  }`}>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${getCategoryColor(category)}`}>
                                          <span className="text-2xl">{getCategoryIcon(category)}</span>
                                        </div>
                                        <div>
                                          <h3 className={`text-2xl font-bold capitalize ${
                                            darkMode ? 'text-white' : 'text-gray-900'
                                          }`}>
                                            {category}
                                          </h3>
                                          <p className={`text-sm ${
                                            darkMode ? 'text-gray-400' : 'text-gray-600'
                                          }`}>
                                            {categoryTodos.length} tasks • {pendingCategoryTodos.length} pending • {completedCategoryTodos.length} completed
                                          </p>
                                        </div>
                                      </div>
                                      <div className={`px-4 py-2 rounded-2xl ${
                                        darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                                      }`}>
                                        <span className="font-semibold">
                                          {Math.round((completedCategoryTodos.length / categoryTodos.length) * 100) || 0}% Complete
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Tasks Grid */}
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {pendingCategoryTodos.length > 0 && (
                                      <div>
                                        <h4 className={`text-lg font-semibold mb-4 ${
                                          darkMode ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                          ⏳ Pending ({pendingCategoryTodos.length})
                                        </h4>
                                        <div className="space-y-4">
                                          {pendingCategoryTodos.map((todo) => (
                                            <TodoItem 
                                              key={todo._id} 
                                              todo={todo} 
                                              onToggleComplete={toggleComplete}
                                              onEdit={setEditingTodo}
                                              onDelete={deleteTodo}
                                              getPriorityColor={getPriorityColor}
                                              getCategoryColor={getCategoryColor}
                                              darkMode={darkMode}
                                            />
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {completedCategoryTodos.length > 0 && (
                                      <div>
                                        <h4 className={`text-lg font-semibold mb-4 ${
                                          darkMode ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                          ✅ Completed ({completedCategoryTodos.length})
                                        </h4>
                                        <div className="space-y-4">
                                          {completedCategoryTodos.map((todo) => (
                                            <TodoItem 
                                              key={todo._id} 
                                              todo={todo} 
                                              onToggleComplete={toggleComplete}
                                              onEdit={setEditingTodo}
                                              onDelete={deleteTodo}
                                              getPriorityColor={getPriorityColor}
                                              getCategoryColor={getCategoryColor}
                                              darkMode={darkMode}
                                            />
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Analytics todos={todos} darkMode={darkMode} />
              )}
            </div>
          </div>
        </div>
      </div>
      <footer
          className={`relative z-50 mt-12 border-t transition-all duration-500 ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              
              {/* Developer Info */}
              <div className="flex flex-col items-center md:items-start space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">PK</span>
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-lg ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Pusala Kotesh
                    </h3>
                    <p
                      className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Full Stack Developer
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-6">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/pusalakotesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 cursor-pointer ${
                    darkMode
                      ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/KoteshPusala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 cursor-pointer ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>

                {/* Feedback */}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd7kmi6yj7myQ4lrXGhF8_85Nv5KX4nCBFwC0J5Y5oL_QdMVQ/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:scale-105 cursor-pointer ${
                    darkMode
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-purple-500/25'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-purple-500/25'
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Give Feedback</span>
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-6 pt-6 border-t border-gray-700">
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                © 2025 TaskFlow. Built with ❤️ by Pusala Kotesh
              </p>
            </div>
          </div>
        </footer>

            

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xl flex items-center justify-center z-50 p-4">
          <div className={`rounded-3xl shadow-2xl max-w-md w-full p-8 transition-all duration-500 backdrop-blur-xl ${
            darkMode ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90 border border-gray-200'
          }`}>
            <div className="flex justify-between items-center mb-8">
              <h3 className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Profile Settings</h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-28 h-28 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <User className="h-12 w-12 text-white" />
                </div>

                <div className="text-center">
                  <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user?.username}
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-700">
                <h4 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Theme Preference
                </h4>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleThemeChange(false)}
                    className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all duration-300 font-semibold shadow-lg hover:scale-105 ${
                      !darkMode 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent' 
                        : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    ☀️ Light
                  </button>
                  <button
                    onClick={() => handleThemeChange(true)}
                    className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all duration-300 font-semibold shadow-lg hover:scale-105 ${
                      darkMode 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent' 
                        : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    🌙 Dark
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        @keyframes float-delay-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-90deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes pulse-slow-delay {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 8s ease-in-out infinite 1s; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite 2s; }
        .animate-float-delay-2 { animation: float-delay-2 7s ease-in-out infinite 1.5s; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slow-delay { animation: pulse-slow-delay 5s ease-in-out infinite 2s; }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }

        .bg-grid-white {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
};

const TodoItem = ({ todo, onToggleComplete, onEdit, onDelete, getPriorityColor, getCategoryColor, darkMode }) => {
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  // Different color schemes based on category
  const getTitleColor = (category) => {
    switch(category) {
      case 'work': return 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white';
      case 'personal': return 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white';
      case 'shopping': return 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white';
      case 'health': return 'bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white';
      case 'education': return 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white';
      default: return 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white';
    }
  };

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
      todo.completed ? 'opacity-75' : ''
    } ${isOverdue ? 'border-l-4 border-l-red-500' : ''} ${
      darkMode 
        ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
        : 'bg-white/50 border-gray-200 hover:bg-white/70'
    }`}>
      <div className="flex items-start space-x-4">
        <button
          onClick={() => onToggleComplete(todo._id, todo.completed)}
          className={`flex-shrink-0 w-8 h-8 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 shadow-lg ${
            todo.completed 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-transparent text-white' 
              : `border-gray-300 hover:border-blue-500 hover:bg-blue-50 ${
                  darkMode ? 'border-gray-600 hover:border-blue-400 hover:bg-blue-900/20' : ''
                }`
          }`}
        >
          {todo.completed && <CheckCircle2 className="h-5 w-5" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Colorful Title Button */}
              <h3 className={`inline-flex items-center px-4 py-2 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 ${
                todo.completed 
                  ? 'line-through bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400' 
                  : getTitleColor(todo.category)
              }`}>
                {todo.title.charAt(0).toUpperCase() + todo.title.slice(1)}
              </h3>
              
              {todo.description && (
                <p className={`text-sm mt-3 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{todo.description}</p>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEdit(todo)}
                className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                  darkMode 
                    ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-900/20' 
                    : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Edit3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(todo._id)}
                className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                  darkMode 
                    ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' 
                    : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg ${getCategoryColor(todo.category)}`}>
              {todo.category}
            </span>
            <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold border shadow-lg ${getPriorityColor(todo.priority)}`}>
              <Flag className="h-3 w-3 mr-1" />
              {todo.priority}
            </span>
            {todo.dueDate && (
              <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg ${
                isOverdue 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                  : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}>
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(todo.dueDate).toLocaleDateString()}
                {isOverdue && <span className="ml-1">• Overdue</span>}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;