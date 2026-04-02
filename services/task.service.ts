import api from '../config/api';

export interface Task {
  id: number;
  name: string;
  description: string;
  status: boolean;
  create_date: string;
  user_id: number;
}

export interface CreateTaskDTO {
  name: string;
  description: string;
}

export const TaskService = {
  async getUserTasks(): Promise<Task[]> {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.result || error.response?.data?.message || 'Erro ao buscar tarefas do usuário');
    }
  },

  async createTask(data: CreateTaskDTO): Promise<Task> {
    try {
      const completeTask = {
        ...data,
        status: false,
        create_date: new Date()
      }
      const response = await api.post(`/tasks`, completeTask);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.result || error.response?.data?.message || 'Erro ao criar tarefa');
    }
  },

  async updateTask(id: number, data: Partial<CreateTaskDTO>): Promise<Task> {
    try {
      const response = await api.put(`/tasks/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.result || error.response?.data?.message || 'Erro ao atualizar tarefa');
    }
  },

  async toggleTaskStatus(id: number, currentStatus: boolean): Promise<Task> {
    try {
      const response = await api.patch(`/tasks/${id}/status`, { status: !currentStatus });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.result || error.response?.data?.message || 'Erro ao atualizar status da tarefa');
    }
  },

  async deleteTask(id: number): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.result || error.response?.data?.message || 'Erro ao excluir tarefa');
    }
  }
};
