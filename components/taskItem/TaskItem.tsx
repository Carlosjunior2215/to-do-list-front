import { Card, Button } from 'react-bootstrap';
import { CheckCircleFill, Circle, Trash, Pencil } from 'react-bootstrap-icons';
import { Task } from '../../services/task.service';
import styles from './Style.module.css';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onToggleDone: (id: number, currentStatus: boolean) => void;
}

export function TaskItem({ task, onDelete, onEdit, onToggleDone }: TaskItemProps) {
  return (
    <Card className={`mb-3 border-0 shadow-sm ${styles.taskCard}`}>
      <Card.Body className="d-flex align-items-center justify-content-between p-3">
        <div className="d-flex align-items-center flex-grow-1 overflow-hidden">
          <Button
            variant="link"
            className="p-0 border-0 me-3 text-primary d-flex align-items-center"
            onClick={() => onToggleDone(task.id, task.status)}
            style={{ fontSize: '1.5rem', lineHeight: 1 }}
          >
            {task.status ? <CheckCircleFill className="text-success" /> : <Circle className="text-secondary opacity-50" />}
          </Button>
          <div className="min-w-0" style={{ opacity: task.status ? 0.6 : 1 }}>
            <h5 className={`mb-1 text-truncate fw-semibold ${task.status ? 'text-decoration-line-through text-muted' : 'text-dark'}`}>
              {task.name}
            </h5>
            {task.description && (
              <p className="mb-0 text-muted small text-truncate">
                {task.description}
              </p>
            )}
          </div>
        </div>
        <div className="ms-3 d-flex flex-shrink-0">
          <Button
            variant="outline-primary"
            size="sm"
            className={`rounded-circle d-flex align-items-center justify-content-center border-0 ${styles.actionBtnEdit} p-2 me-2`}
            onClick={() => onEdit(task)}
            style={{ width: '36px', height: '36px' }}
          >
            <Pencil />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            className={`rounded-circle d-flex align-items-center justify-content-center border-0 ${styles.actionBtnDelete} p-2`}
            onClick={() => onDelete(task.id)}
            style={{ width: '36px', height: '36px' }}
          >
            <Trash />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
