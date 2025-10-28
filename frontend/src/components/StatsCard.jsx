import React, { useState, useEffect } from 'react';
import { todoService } from '../services/todoService';
import { CheckCircle, Clock, ListTodo, TrendingUp } from 'lucide-react';

const StatsCard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await todoService.getStats();
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statItems = [
    {
      icon: ListTodo,
      label: 'Total',
      value: stats.total,
      color: 'text-blue-600'
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: stats.completed,
      color: 'text-green-600'
    },
    {
      icon: Clock,
      label: 'Pending',
      value: stats.pending,
      color: 'text-yellow-600'
    },
    {
      icon: TrendingUp,
      label: 'Completion',
      value: `${completionRate}%`,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Overview</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
            <item.icon className={`h-6 w-6 mx-auto mb-2 ${item.color}`} />
            <div className="text-2xl font-bold text-gray-900">{item.value}</div>
            <div className="text-sm text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;