import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateTaskDTO, Task } from '../../services/task.service';
import styles from './Style.module.css'

interface TaskModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (task: CreateTaskDTO) => Promise<{ success: boolean }>;
  taskToEdit?: Task | null;
}

export function TaskModal({ show, onHide, onSave, taskToEdit }: TaskModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (show) {
      if (taskToEdit) {
        setName(taskToEdit.name);
        setDescription(taskToEdit.description || '');
      } else {
        setName('');
        setDescription('');
      }
    } else {
      setName('');
      setDescription('');
      setValidated(false);
      setIsSubmitting(false);
    }
  }, [show, taskToEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setIsSubmitting(true);

    const result = await onSave({ name, description });
    if (result.success) {
      onHide();
    } else {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">{taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className="px-4">
          <Form.Group className="mb-3" controlId="taskName">
            <Form.Label className="fw-semibold small text-muted">Nome da Tarefa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Comprar pão"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              className="rounded-3 px-3 py-2 shadow-none border-secondary-subtle"
            />
            <Form.Control.Feedback type="invalid">
              O nome da tarefa é obrigatório.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskDescription">
            <Form.Label className="fw-semibold small text-muted">Descrição (Opcional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Adicione mais detalhes aqui..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-3 px-3 py-2 shadow-none border-secondary-subtle"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 px-4 pb-4 d-flex justify-content-between">
          <Button variant="light" onClick={onHide} disabled={isSubmitting} className="rounded-pill px-4 text-muted fw-semibold">
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className={`rounded-pill px-4 fw-semibold ${styles.submitBtn} d-flex align-items-center`}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Salvando...
              </>
            ) : (
              taskToEdit ? 'Salvar Alterações' : 'Adicionar Tarefa'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
