// import api from './api';

// export const todoService = {
//   async getTodos(params = {}) {
//     try {
//       console.log('🔄 todoService.getTodos called with params:', params);
//       const response = await api.get('/todos', { params });
//       console.log('✅ todoService.getTodos response received');
//       return response.data;
//     } catch (error) {
//       console.error('❌ todoService.getTodos error:', {
//         status: error.response?.status,
//         message: error.response?.data?.message || error.message
//       });
//       throw error;
//     }
//   },

//   async createTodo(todoData) {
//     try {
//       const response = await api.post('/todos', todoData);
//       return response.data;
//     } catch (error) {
//       console.error('❌ todoService.createTodo error:', error.response?.data || error.message);
//       throw error;
//     }
//   },

//   async updateTodo(id, updates) {
//     try {
//       const response = await api.put(`/todos/${id}`, updates);
//       return response.data;
//     } catch (error) {
//       console.error('❌ todoService.updateTodo error:', error.response?.data || error.message);
//       throw error;
//     }
//   },

//   async deleteTodo(id) {
//     try {
//       const response = await api.delete(`/todos/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error('❌ todoService.deleteTodo error:', error.response?.data || error.message);
//       throw error;
//     }
//   },

//   async getStats() {
//     try {
//       const response = await api.get('/todos/stats');
//       return response.data;
//     } catch (error) {
//       console.error('❌ todoService.getStats error:', error.response?.data || error.message);
//       throw error;
//     }
//   }
// };

import api from './api';

export const todoService = {
  async getTodos(params = {}) {
    try {
      console.log('🔄 todoService.getTodos called with params:', params);
      const response = await api.get('/todos', { 
        params,
        timeout: 10000,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      const todos = Array.isArray(response.data) ? response.data : [];
      console.log('✅ todoService.getTodos response received:', todos.length, 'todos');
      console.log('📊 Todos data:', todos);
      
      return todos;
    } catch (error) {
      console.error('❌ todoService.getTodos error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        config: error.config
      });
      
      // Return empty array instead of throwing to prevent crashes
      return [];
    }
  },

  async createTodo(todoData) {
    try {
      console.log('➕ todoService.createTodo called with:', todoData);
      const response = await api.post('/todos', todoData);
      console.log('✅ Todo created successfully');
      return response.data;
    } catch (error) {
      console.error('❌ todoService.createTodo error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  async updateTodo(id, updates) {
    try {
      console.log('✏️ todoService.updateTodo called for ID:', id, 'with updates:', updates);
      const response = await api.put(`/todos/${id}`, updates);
      console.log('✅ Todo updated successfully');
      return response.data;
    } catch (error) {
      console.error('❌ todoService.updateTodo error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  async deleteTodo(id) {
    try {
      console.log('🗑️ todoService.deleteTodo called for ID:', id);
      const response = await api.delete(`/todos/${id}`);
      console.log('✅ Todo deleted successfully');
      return response.data;
    } catch (error) {
      console.error('❌ todoService.deleteTodo error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  async getStats() {
    try {
      console.log('📈 todoService.getStats called');
      const response = await api.get('/todos/stats');
      console.log('✅ Stats fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ todoService.getStats error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  }
};