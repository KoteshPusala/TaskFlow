// import React from 'react';
// import { 
//   BarChart3, 
//   PieChart, 
//   TrendingUp, 
//   Calendar, 
//   Target,
//   Clock,
//   CheckCircle2,
//   AlertTriangle,
//   Zap,
//   Award,
//   Activity,
//   Users,
//   Sparkles,
//   Target as TargetIcon,
//   BarChart,
//   PieChart as PieChartIcon
// } from 'lucide-react';

// const Analytics = ({ todos, darkMode }) => {
//   // Calculate analytics data
//   const totalTodos = todos.length;
//   const completedTodos = todos.filter(todo => todo.completed).length;
//   const pendingTodos = todos.filter(todo => !todo.completed).length;
//   const completionRate = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

//   // Category analytics
//   const categoryStats = todos.reduce((acc, todo) => {
//     if (!acc[todo.category]) {
//       acc[todo.category] = { total: 0, completed: 0, color: '' };
//     }
//     acc[todo.category].total++;
//     if (todo.completed) acc[todo.category].completed++;
    
//     // Assign colors
//     const colors = {
//       work: 'from-blue-500 to-cyan-500',
//       personal: 'from-green-500 to-emerald-500',
//       shopping: 'from-purple-500 to-pink-500',
//       health: 'from-rose-500 to-red-500',
//       education: 'from-amber-500 to-orange-500'
//     };
//     acc[todo.category].color = colors[todo.category] || 'from-gray-500 to-gray-600';
    
//     return acc;
//   }, {});

//   // Priority analytics
//   const priorityStats = todos.reduce((acc, todo) => {
//     if (!acc[todo.priority]) {
//       acc[todo.priority] = { total: 0, completed: 0 };
//     }
//     acc[todo.priority].total++;
//     if (todo.completed) acc[todo.priority].completed++;
//     return acc;
//   }, {});

//   // Weekly trend
// const weeklyData = [...Array(7)].map((_, i) => {
//   const date = new Date();
//   date.setDate(date.getDate() - i);
//   const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  
//   // Generate more realistic task data based on actual todos
//   const dayTodos = todos.filter(todo => {
//     const todoDate = new Date(todo.createdAt).toLocaleDateString();
//     const compareDate = date.toLocaleDateString();
//     return todoDate === compareDate;
//   });
  
//   return {
//     day: dayName,
//     completed: dayTodos.filter(todo => todo.completed).length,
//     created: dayTodos.length
//   };
// }).reverse();
//   // Overdue tasks
//   const overdueTodos = todos.filter(todo => 
//     todo.dueDate && 
//     new Date(todo.dueDate) < new Date() && 
//     !todo.completed
//   );

//   // Productivity score
//   // Productivity score (0-100)
//   const productivityScore = totalTodos === 0 ? 0 : Math.round(
//     (completedTodos / totalTodos) * 100
// );
//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-8 transition-all duration-500 ${
//         darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
//       }`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
//               <BarChart3 className="h-8 w-8 text-white" />
//             </div>
//             <div>
//               <h2 className={`text-3xl font-bold ${
//                 darkMode ? 'text-white' : 'text-gray-900'
//               }`}>Analytics Dashboard</h2>
//               <p className={`mt-2 ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>Deep insights into your productivity patterns</p>
//             </div>
//           </div>
//           <div className={`px-6 py-3 rounded-2xl shadow-lg ${
//             productivityScore >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
//             productivityScore >= 60 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
//             'bg-gradient-to-r from-red-500 to-pink-500'
//           } text-white font-bold text-lg`}>
//             🏆 Score: {productivityScore}/100
//           </div>
//         </div>
//       </div>

//       {/* Key Metrics Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Completion Rate */}
//         <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 hover:scale-105 ${
//           darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
//         }`}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className={`text-sm font-medium ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>Completion Rate</p>
//               <p className="text-3xl font-bold text-green-500 mt-2">{Math.round(completionRate)}%</p>
//               <p className={`text-xs mt-1 ${
//                 darkMode ? 'text-gray-500' : 'text-gray-500'
//               }`}>{completedTodos} of {totalTodos} tasks</p>
//             </div>
//             <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
//               <TrendingUp className="h-6 w-6 text-white" />
//             </div>
//           </div>
//         </div>

//         {/* Total Tasks */}
//         <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 hover:scale-105 ${
//           darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
//         }`}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className={`text-sm font-medium ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>Total Tasks</p>
//               <p className="text-3xl font-bold text-blue-500 mt-2">{totalTodos}</p>
//               <p className={`text-xs mt-1 ${
//                 darkMode ? 'text-gray-500' : 'text-gray-500'
//               }`}>{pendingTodos} pending</p>
//             </div>
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
//               <Target className="h-6 w-6 text-white" />
//             </div>
//           </div>
//         </div>

//         {/* Overdue Tasks */}
//         <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 hover:scale-105 ${
//           darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
//         }`}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className={`text-sm font-medium ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>Overdue Tasks</p>
//               <p className={`text-3xl font-bold mt-2 ${
//                 overdueTodos.length > 0 ? 'text-red-500' : 'text-green-500'
//               }`}>{overdueTodos.length}</p>
//               <p className={`text-xs mt-1 ${
//                 darkMode ? 'text-gray-500' : 'text-gray-500'
//               }`}>Need attention</p>
//             </div>
//             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
//               overdueTodos.length > 0 
//                 ? 'bg-gradient-to-r from-red-500 to-pink-500' 
//                 : 'bg-gradient-to-r from-green-500 to-emerald-500'
//             }`}>
//               <AlertTriangle className="h-6 w-6 text-white" />
//             </div>
//           </div>
//         </div>

//         {/* Productivity Streak */}
//         <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 hover:scale-105 ${
//           darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
//         }`}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className={`text-sm font-medium ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>Daily Average</p>
//               <p className="text-3xl font-bold text-purple-500 mt-2">{Math.round(totalTodos / 7)}</p>
//               <p className={`text-xs mt-1 ${
//                 darkMode ? 'text-gray-500' : 'text-gray-500'
//               }`}>Tasks per day</p>
//             </div>
//             <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
//               <Zap className="h-6 w-6 text-white" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts and Detailed Analytics */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Category Distribution */}
//         <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 ${
//           darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
//         }`}>
//           <div className="flex items-center space-x-3 mb-6">
//             <PieChartIcon className={`h-6 w-6 ${
//               darkMode ? 'text-purple-400' : 'text-purple-600'
//             }`} />
//             <h3 className={`text-xl font-bold ${
//               darkMode ? 'text-white' : 'text-gray-900'
//             }`}>Tasks by Category</h3>
//           </div>
//           <div className="space-y-4">
//             {Object.entries(categoryStats).map(([category, stats]) => {
//               const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
//               return (
//                 <div key={category} className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center space-x-3">
//                       <div className={`w-3 h-3 rounded-full ${stats.color.replace('from-', 'bg-').split(' ')[0]}`}></div>
//                       <span className={`font-medium capitalize ${
//                         darkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>{category}</span>
//                     </div>
//                     <span className={`text-sm ${
//                       darkMode ? 'text-gray-400' : 'text-gray-600'
//                     }`}>
//                       {stats.completed}/{stats.total} ({Math.round(completionRate)}%)
//                     </span>
//                   </div>
//                   <div className={`w-full h-4 rounded-2xl ${
//                     darkMode ? 'bg-gray-700' : 'bg-gray-200'
//                   }`}>
//                     <div 
//                       className={`h-4 rounded-2xl transition-all duration-1000 ${stats.color}`}
//                       style={{ width: `${completionRate}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Priority Analysis */}
//         <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 ${
//           darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
//         }`}>
//           <div className="flex items-center space-x-3 mb-6">
//             <TargetIcon className={`h-6 w-6 ${
//               darkMode ? 'text-amber-400' : 'text-amber-600'
//             }`} />
//             <h3 className={`text-xl font-bold ${
//               darkMode ? 'text-white' : 'text-gray-900'
//             }`}>Priority Analysis</h3>
//           </div>
//           <div className="space-y-4">
//             {Object.entries(priorityStats).map(([priority, stats]) => {
//               const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
//               const priorityColor = {
//                 high: 'bg-gradient-to-r from-red-500 to-pink-500',
//                 medium: 'bg-gradient-to-r from-amber-500 to-orange-500',
//                 low: 'bg-gradient-to-r from-green-500 to-emerald-500'
//               }[priority];

//               return (
//                 <div key={priority} className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <span className={`font-medium capitalize ${
//                       darkMode ? 'text-gray-300' : 'text-gray-700'
//                     }`}>
//                       {priority} Priority
//                     </span>
//                     <span className={`text-sm ${
//                       darkMode ? 'text-gray-400' : 'text-gray-600'
//                     }`}>
//                       {stats.completed}/{stats.total} ({Math.round(completionRate)}%)
//                     </span>
//                   </div>
//                   <div className={`w-full h-4 rounded-2xl ${
//                     darkMode ? 'bg-gray-700' : 'bg-gray-200'
//                   }`}>
//                     <div 
//                       className={`h-4 rounded-2xl transition-all duration-1000 ${priorityColor}`}
//                       style={{ width: `${completionRate}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Weekly Progress */}
//         <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 ${
//         darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
//         }`}>
//         <div className="flex items-center space-x-3 mb-6">
//             <Calendar className={`h-6 w-6 ${
//             darkMode ? 'text-blue-400' : 'text-blue-600'
//             }`} />
//             <h3 className={`text-xl font-bold ${
//             darkMode ? 'text-white' : 'text-gray-900'
//             }`}>Weekly Progress</h3>
//         </div>
        
//         <div className="grid grid-cols-7 gap-3">
//             {weeklyData.map((day, index) => {
//             const maxHeight = 12; // Maximum height in rem
//             const createdHeight = (day.created / 15) * maxHeight;
//             const completedHeight = (day.completed / 10) * maxHeight;
//             const totalHeight = Math.max(createdHeight, completedHeight);
            
//             return (
//                 <div key={index} className="flex flex-col items-center">
//                 <div className={`text-xs font-medium mb-2 ${
//                     darkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}>{day.day}</div>
                
//                 <div className="flex items-end justify-center space-x-1" style={{ height: `${maxHeight + 1}rem` }}>
//                     {/* Created Tasks Bar */}
//                     <div className="flex flex-col items-center">
//                     <div 
//                         className="w-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-lg transition-all duration-500"
//                         style={{ height: `${createdHeight}rem` }}
//                     ></div>
//                     <div className="text-xs text-blue-500 mt-1 font-medium">
//                         {day.created}
//                     </div>
//                     </div>
                    
//                     {/* Completed Tasks Bar */}
//                     <div className="flex flex-col items-center">
//                     <div 
//                         className="w-4 bg-gradient-to-b from-green-400 to-green-600 rounded-t-lg transition-all duration-500"
//                         style={{ height: `${completedHeight}rem` }}
//                     ></div>
//                     <div className="text-xs text-green-500 mt-1 font-medium">
//                         {day.completed}
//                     </div>
//                     </div>
//                 </div>
//                 </div>
//             );
//             })}
//         </div>
        
//         {/* Legend */}
//         <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-700">
//             <div className="flex items-center space-x-2">
//             <div className="w-4 h-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded"></div>
//             <span className={`text-xs font-medium ${
//                 darkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>Created</span>
//             </div>
//             <div className="flex items-center space-x-2">
//             <div className="w-4 h-4 bg-gradient-to-b from-green-400 to-green-600 rounded"></div>
//             <span className={`text-xs font-medium ${
//                 darkMode ? 'text-gray-300' : 'text-gray-600'
//             }`}>Completed</span>
//             </div>
//         </div>
        
//         {/* Weekly Summary */}
//         <div className="mt-4 grid grid-cols-2 gap-4 text-center">
//             <div className={`p-3 rounded-xl ${
//             darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
//             }`}>
//             <div className="text-2xl font-bold text-blue-500">
//                 {weeklyData.reduce((sum, day) => sum + day.created, 0)}
//             </div>
//             <div className={`text-xs ${
//                 darkMode ? 'text-blue-300' : 'text-blue-600'
//             }`}>Total Created</div>
//             </div>
//             <div className={`p-3 rounded-xl ${
//             darkMode ? 'bg-green-900/20' : 'bg-green-50'
//             }`}>
//             <div className="text-2xl font-bold text-green-500">
//                 {weeklyData.reduce((sum, day) => sum + day.completed, 0)}
//             </div>
//             <div className={`text-xs ${
//                 darkMode ? 'text-green-300' : 'text-green-600'
//             }`}>Total Completed</div>
//             </div>
//         </div>
//         </div>

//         {/* Performance Insights */}
//         <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 ${
//           darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
//         }`}>
//           <div className="flex items-center space-x-3 mb-6">
//             <Award className={`h-6 w-6 ${
//               darkMode ? 'text-yellow-400' : 'text-yellow-600'
//             }`} />
//             <h3 className={`text-xl font-bold ${
//               darkMode ? 'text-white' : 'text-gray-900'
//             }`}>Performance Insights</h3>
//           </div>
//           <div className="space-y-4">
//             <div className={`p-4 rounded-2xl ${
//               darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
//             }`}>
//               <div className="flex items-center space-x-3">
//                 <Sparkles className="h-5 w-5 text-blue-500" />
//                 <div>
//                   <p className={`font-medium ${
//                     darkMode ? 'text-white' : 'text-gray-900'
//                   }`}>Productivity Level</p>
//                   <p className={`text-sm ${
//                     darkMode ? 'text-blue-300' : 'text-blue-600'
//                   }`}>
//                     {productivityScore >= 80 ? 'Excellent! Keep up the great work! 🚀' :
//                      productivityScore >= 60 ? 'Good progress! You are doing well! 👍' :
//                      'Keep going! Every task completed counts! 💪'}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className={`p-4 rounded-2xl ${
//               darkMode ? 'bg-green-900/20' : 'bg-green-50'
//             }`}>
//               <div className="flex items-center space-x-3">
//                 <CheckCircle2 className="h-5 w-5 text-green-500" />
//                 <div>
//                   <p className={`font-medium ${
//                     darkMode ? 'text-white' : 'text-gray-900'
//                   }`}>Completion Streak</p>
//                   <p className={`text-sm ${
//                     darkMode ? 'text-green-300' : 'text-green-600'
//                   }`}>
//                     You've completed {completedTodos} tasks this week
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {overdueTodos.length > 0 && (
//               <div className={`p-4 rounded-2xl ${
//                 darkMode ? 'bg-red-900/20' : 'bg-red-50'
//               }`}>
//                 <div className="flex items-center space-x-3">
//                   <AlertTriangle className="h-5 w-5 text-red-500" />
//                   <div>
//                     <p className={`font-medium ${
//                       darkMode ? 'text-white' : 'text-gray-900'
//                     }`}>Attention Needed</p>
//                     <p className={`text-sm ${
//                       darkMode ? 'text-red-300' : 'text-red-600'
//                     }`}>
//                       {overdueTodos.length} task{overdueTodos.length > 1 ? 's' : ''} overdue
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analytics;

import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar, 
  Target,
  AlertTriangle,
  Zap,
  Award,
  Sparkles,
  CheckCircle2,
  Target as TargetIcon,
  PieChart as PieChartIcon
} from 'lucide-react';

const Analytics = ({ todos, darkMode }) => {
  // Add safety check at the very top
  if (!todos || !Array.isArray(todos)) {
    return (
      <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-8 text-center ${
        darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="text-red-500 text-lg">No tasks data available</div>
      </div>
    );
  }

  // Calculate analytics data
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = todos.filter(todo => !todo.completed).length;
  const completionRate = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  // Category analytics
  const categoryStats = todos.reduce((acc, todo) => {
    if (!acc[todo.category]) {
      acc[todo.category] = { total: 0, completed: 0, color: '' };
    }
    acc[todo.category].total++;
    if (todo.completed) acc[todo.category].completed++;
    
    // Assign colors
    const colors = {
      work: 'from-blue-500 to-cyan-500',
      personal: 'from-green-500 to-emerald-500',
      shopping: 'from-purple-500 to-pink-500',
      health: 'from-rose-500 to-red-500',
      education: 'from-amber-500 to-orange-500'
    };
    acc[todo.category].color = colors[todo.category] || 'from-gray-500 to-gray-600';
    
    return acc;
  }, {});

  // Priority analytics
  const priorityStats = todos.reduce((acc, todo) => {
    if (!acc[todo.priority]) {
      acc[todo.priority] = { total: 0, completed: 0 };
    }
    acc[todo.priority].total++;
    if (todo.completed) acc[todo.priority].completed++;
    return acc;
  }, {});

  // Weekly trend - FIXED: Better date handling
  const weeklyData = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i)); // Start from 6 days ago to today
    
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    // Generate more realistic task data based on actual todos
    const dayTodos = todos.filter(todo => {
      if (!todo.createdAt) return false;
      const todoDate = new Date(todo.createdAt);
      return (
        todoDate.getDate() === date.getDate() &&
        todoDate.getMonth() === date.getMonth() &&
        todoDate.getFullYear() === date.getFullYear()
      );
    });
    
    return {
      day: dayName,
      completed: dayTodos.filter(todo => todo.completed).length,
      created: dayTodos.length,
      date: new Date(date) // Store date for reference
    };
  });

  // Overdue tasks
  const overdueTodos = todos.filter(todo => 
    todo.dueDate && 
    new Date(todo.dueDate) < new Date() && 
    !todo.completed
  );

  // Productivity score (0-100)
  const productivityScore = totalTodos === 0 ? 0 : Math.round(
    (completedTodos / totalTodos) * 100
  );

  // FIXED: Daily average calculation
  // Get unique days with todos to calculate proper average
  const daysWithTodos = [...new Set(todos.map(todo => {
    if (!todo.createdAt) return null;
    const date = new Date(todo.createdAt);
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  }))].filter(Boolean);

  const dailyAverage = daysWithTodos.length > 0 
    ? Math.round(totalTodos / daysWithTodos.length) 
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-8 transition-all duration-500 ${
        darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className={`text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Analytics Dashboard</h2>
              <p className={`mt-2 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Deep insights into your productivity patterns</p>
            </div>
          </div>
          <div className={`px-6 py-3 rounded-2xl shadow-lg ${
            productivityScore >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
            productivityScore >= 60 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
            'bg-gradient-to-r from-red-500 to-pink-500'
          } text-white font-bold text-lg`}>
            🏆 Score: {productivityScore}/100
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Completion Rate */}
        <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 hover:scale-105 ${
          darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Completion Rate</p>
              <p className="text-3xl font-bold text-green-500 mt-2">{Math.round(completionRate)}%</p>
              <p className={`text-xs mt-1 ${
                darkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>{completedTodos} of {totalTodos} tasks</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Total Tasks */}
        <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 hover:scale-105 ${
          darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Total Tasks</p>
              <p className="text-3xl font-bold text-blue-500 mt-2">{totalTodos}</p>
              <p className={`text-xs mt-1 ${
                darkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>{pendingTodos} pending</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Overdue Tasks */}
        <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 hover:scale-105 ${
          darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Overdue Tasks</p>
              <p className={`text-3xl font-bold mt-2 ${
                overdueTodos.length > 0 ? 'text-red-500' : 'text-green-500'
              }`}>{overdueTodos.length}</p>
              <p className={`text-xs mt-1 ${
                darkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>Need attention</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
              overdueTodos.length > 0 
                ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                : 'bg-gradient-to-r from-green-500 to-emerald-500'
            }`}>
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Daily Average - FIXED */}
        <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 hover:scale-105 ${
          darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Daily Average</p>
              <p className="text-3xl font-bold text-purple-500 mt-2">{dailyAverage}</p>
              <p className={`text-xs mt-1 ${
                darkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>Tasks per active day</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 ${
          darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <PieChartIcon className={`h-6 w-6 ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <h3 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Tasks by Category</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(categoryStats).map(([category, stats]) => {
              const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
              return (
                <div key={category} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${stats.color.replace('from-', 'bg-').split(' ')[0]}`}></div>
                      <span className={`font-medium capitalize ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{category}</span>
                    </div>
                    <span className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {stats.completed}/{stats.total} ({Math.round(completionRate)}%)
                    </span>
                  </div>
                  <div className={`w-full h-4 rounded-2xl ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div 
                      className={`h-4 rounded-2xl transition-all duration-1000 ${stats.color}`}
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Analysis */}
        <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 ${
          darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <TargetIcon className={`h-6 w-6 ${
              darkMode ? 'text-amber-400' : 'text-amber-600'
            }`} />
            <h3 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Priority Analysis</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(priorityStats).map(([priority, stats]) => {
              const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
              const priorityColor = {
                high: 'bg-gradient-to-r from-red-500 to-pink-500',
                medium: 'bg-gradient-to-r from-amber-500 to-orange-500',
                low: 'bg-gradient-to-r from-green-500 to-emerald-500'
              }[priority];

              return (
                <div key={priority} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium capitalize ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {priority} Priority
                    </span>
                    <span className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {stats.completed}/{stats.total} ({Math.round(completionRate)}%)
                    </span>
                  </div>
                  <div className={`w-full h-4 rounded-2xl ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div 
                      className={`h-4 rounded-2xl transition-all duration-1000 ${priorityColor}`}
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Progress - FIXED: Graph height calculation */}
        <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 ${
          darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className={`h-6 w-6 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <h3 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Weekly Progress</h3>
          </div>
          
          <div className="grid grid-cols-7 gap-3">
            {weeklyData.map((day, index) => {
              const maxHeight = 8; // Reduced maximum height in rem
              
              // FIXED: Better scaling with minimum height for visibility
              const maxCreated = Math.max(...weeklyData.map(d => d.created), 1);
              const maxCompleted = Math.max(...weeklyData.map(d => d.completed), 1);
              
              // Ensure minimum height for visibility but prevent huge bars for small numbers
              const createdHeight = Math.max((day.created / maxCreated) * maxHeight, 0.5);
              const completedHeight = Math.max((day.completed / maxCompleted) * maxHeight, 0.5);
              
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`text-xs font-medium mb-2 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{day.day}</div>
                  
                  <div className="flex items-end justify-center space-x-1" style={{ height: `${maxHeight + 1}rem` }}>
                    {/* Created Tasks Bar */}
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-lg transition-all duration-500"
                        style={{ height: `${createdHeight}rem` }}
                      ></div>
                      <div className="text-xs text-blue-500 mt-1 font-medium">
                        {day.created}
                      </div>
                    </div>
                    
                    {/* Completed Tasks Bar */}
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-4 bg-gradient-to-b from-green-400 to-green-600 rounded-t-lg transition-all duration-500"
                        style={{ height: `${completedHeight}rem` }}
                      ></div>
                      <div className="text-xs text-green-500 mt-1 font-medium">
                        {day.completed}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded"></div>
              <span className={`text-xs font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Created</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-b from-green-400 to-green-600 rounded"></div>
              <span className={`text-xs font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Completed</span>
            </div>
          </div>
          
          {/* Weekly Summary */}
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className={`p-3 rounded-xl ${
              darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <div className="text-2xl font-bold text-blue-500">
                {weeklyData.reduce((sum, day) => sum + day.created, 0)}
              </div>
              <div className={`text-xs ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`}>Total Created</div>
            </div>
            <div className={`p-3 rounded-xl ${
              darkMode ? 'bg-green-900/20' : 'bg-green-50'
            }`}>
              <div className="text-2xl font-bold text-green-500">
                {weeklyData.reduce((sum, day) => sum + day.completed, 0)}
              </div>
              <div className={`text-xs ${
                darkMode ? 'text-green-300' : 'text-green-600'
              }`}>Total Completed</div>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className={`rounded-3xl backdrop-blur-xl shadow-2xl border p-6 transition-all duration-500 ${
          darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <Award className={`h-6 w-6 ${
              darkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`} />
            <h3 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Performance Insights</h3>
          </div>
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl ${
              darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <div className="flex items-center space-x-3">
                <Sparkles className="h-5 w-5 text-blue-500" />
                <div>
                  <p className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>Productivity Level</p>
                  <p className={`text-sm ${
                    darkMode ? 'text-blue-300' : 'text-blue-600'
                  }`}>
                    {productivityScore >= 80 ? 'Excellent! Keep up the great work! 🚀' :
                     productivityScore >= 60 ? 'Good progress! You are doing well! 👍' :
                     'Keep going! Every task completed counts! 💪'}
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl ${
              darkMode ? 'bg-green-900/20' : 'bg-green-50'
            }`}>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>Completion Streak</p>
                  <p className={`text-sm ${
                    darkMode ? 'text-green-300' : 'text-green-600'
                  }`}>
                    You've completed {completedTodos} tasks this week
                  </p>
                </div>
              </div>
            </div>

            {overdueTodos.length > 0 && (
              <div className={`p-4 rounded-2xl ${
                darkMode ? 'bg-red-900/20' : 'bg-red-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className={`font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>Attention Needed</p>
                    <p className={`text-sm ${
                      darkMode ? 'text-red-300' : 'text-red-600'
                    }`}>
                      {overdueTodos.length} task{overdueTodos.length > 1 ? 's' : ''} overdue
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;