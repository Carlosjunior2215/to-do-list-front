"use client";

import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { Search, PlusLg, CheckAll, ViewStacked } from 'react-bootstrap-icons';
import styles from './Style.module.css';
import { useTasks } from '../../hooks/useTasks';
import { Task } from '../../services/task.service';
import { TaskColumn } from '../../components/authGuard/TaskColumn';
import { TaskModal } from '../../components/taskModal/TaskModal';

export default function DashboardPage() {
  const { tasks, isLoading, error, addTask, updateTask, toggleTaskStatus, deleteTask } = useTasks();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyDone, setShowOnlyDone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (showOnlyDone) {
        return matchesSearch && task.status;
      }
      return matchesSearch;
    });
  }, [tasks, searchQuery, showOnlyDone]);

  const handleSaveTask = async (data: { name: string; description: string }) => {
    if (taskToEdit) {
      return await updateTask(taskToEdit.id, data);
    } else {
      return await addTask(data);
    }
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  return (
    <div className={`${styles.dashboardWrapper} min-vh-100 py-5`}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h2 className={`fw-bold ${styles.textGradient} mb-0`}>Minhas Tarefas</h2>
                <p className="text-muted mb-0">Organize seu dia com facilidade</p>
              </div>
              <Button 
                variant="primary" 
                className={`d-flex align-items-center rounded-pill py-2 px-4 shadow-sm ${styles.addBtn}`}
                onClick={() => {
                  setTaskToEdit(null);
                  setShowModal(true);
                }}
              >
                <PlusLg className="me-2 fw-bold" />
                Nova Tarefa
              </Button>
            </div>

            {error && (
              <div className="alert alert-danger shadow-sm border-0 rounded-3 mb-4">
                {error}
              </div>
            )}

            <Card className={`border-0 shadow-sm rounded-4 mb-4 ${styles.glassCard}`}>
              <Card.Body className="p-3 d-flex flex-column flex-sm-row gap-3">
                <InputGroup className={`${styles.customInputGroup} flex-grow-1`}>
                  <InputGroup.Text className="bg-white border-end-0 text-muted">
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Pesquisar tarefas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-start-0 py-2 shadow-none ps-0"
                  />
                </InputGroup>

                <div className="d-flex flex-shrink-0">
                  <Button 
                    variant={showOnlyDone ? "primary" : "outline-secondary"}
                    className={`d-flex align-items-center rounded-3 px-3 w-100 ${styles.filterBtn} ${showOnlyDone ? `${styles.bgGradientPrimary} border-0 shadow-sm` : ''}`}
                    onClick={() => setShowOnlyDone(!showOnlyDone)}
                  >
                    {showOnlyDone ? <CheckAll className="me-2" /> : <ViewStacked className="me-2" />}
                    {showOnlyDone ? 'Filtradas (Feitas)' : 'Mostrar Feitas'}
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <div className="mt-4">
              {isLoading && tasks.length === 0 ? (
                <div className="d-flex justify-content-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              ) : (
                <TaskColumn 
                  tasks={filteredTasks}
                  onDeleteTask={deleteTask}
                  onEditTask={handleEditTask}
                  onToggleTaskStatus={toggleTaskStatus}
                />
              )}
            </div>

          </Col>
        </Row>
      </Container>

      <TaskModal 
        show={showModal} 
        taskToEdit={taskToEdit}
        onHide={() => {
          setShowModal(false);
          setTaskToEdit(null);
        }}
        onSave={handleSaveTask}
      />
    </div>
  );
}
