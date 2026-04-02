import { TaskItem } from '../taskItem/TaskItem';
import { Task } from '../../services/task.service';

interface TaskColumnProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onEditTask: (task: Task) => void;
  onToggleTaskStatus: (id: number, currentStatus: boolean) => void;
}

export function TaskColumn({ tasks, onDeleteTask, onEditTask, onToggleTaskStatus }: TaskColumnProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <p className="mb-0">Nenhuma tarefa encontrada.</p>
      </div>
    );
  }

  return (
    <div className="task-column">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
          onToggleDone={onToggleTaskStatus}
        />
      ))}
    </div>
  );
}
