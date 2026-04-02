import { useState, useCallback, useEffect } from 'react';
import { Task, TaskService, CreateTaskDTO } from '../services/task.service';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await TaskService.getUserTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao carregar as tarefas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (data: CreateTaskDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const newTask = await TaskService.createTask(data);
      setTasks(prev => [...prev, newTask]);
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Erro ao adicionar a tarefa');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: number, data: Partial<CreateTaskDTO>) => {
    setIsLoading(true);
    setError(null);
    try {
      await TaskService.updateTask(id, data);
      await fetchTasks();
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar a tarefa');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTaskStatus = async (id: number, currentStatus: boolean) => {
    setError(null);
    try {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: !currentStatus } : t));
      await TaskService.toggleTaskStatus(id, currentStatus);
    } catch (err: any) {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: currentStatus } : t));
      setError(err.message || 'Erro ao atualizar o status da tarefa');
    }
  };

  const deleteTask = async (id: number) => {
    setError(null);
    try {
      setTasks(prev => prev.filter(t => t.id !== id));
      await TaskService.deleteTask(id);
    } catch (err: any) {
      await fetchTasks();
      setError(err.message || 'Erro ao excluir a tarefa');
    }
  };

  return {
    tasks,
    isLoading,
    error,
    addTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
    refreshTasks: fetchTasks
  };
}
