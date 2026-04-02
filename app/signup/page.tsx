"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSignup } from '../../hooks/useSignup';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Envelope, Lock, Person, Eye, EyeSlash } from 'react-bootstrap-icons';
import styles from './Style.module.css';

export default function SignupPage() {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { signup, isLoading, error, success } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      event.stopPropagation();
      return;
    }
    
    setValidated(true);

    const result = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setValidated(false);
    }
  };

  return (
    <div className={`${styles.registrationWrapper} d-flex align-items-center justify-content-center min-vh-100`}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className={`shadow-lg border-0 ${styles.registrationCard}`}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className={`fw-bold ${styles.textGradient} mb-2`}>Criar Conta</h2>
                  <p className="text-muted">Preencha seus dados abaixo para se cadastrar</p>
                </div>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="formName">
                    <Form.Label className="fw-semibold small">Nome Completo</Form.Label>
                    <InputGroup className={`has-validation rounded-3 shadow-sm ${styles.customInputGroup}`}>
                      <InputGroup.Text className="bg-white text-muted border-end-0">
                        <Person />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="João da Silva"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-start-0 ps-0"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor, insira seu nome completo.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Label className="fw-semibold small">Endereço de E-mail</Form.Label>
                    <InputGroup className={`has-validation rounded-3 shadow-sm ${styles.customInputGroup}`}>
                      <InputGroup.Text className="bg-white text-muted border-end-0">
                        <Envelope />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="nome@exemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-start-0 ps-0"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor, insira um e-mail válido.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label className="fw-semibold small">Senha</Form.Label>
                    <InputGroup className={`has-validation rounded-3 shadow-sm ${styles.customInputGroup}`}>
                      <InputGroup.Text className="bg-white text-muted border-end-0">
                        <Lock />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="border-x-0 px-0"
                      />
                      <InputGroup.Text 
                        className="bg-white text-muted border-start-0 cursor-pointer hover-text-primary"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}
                      >
                        {showPassword ? <EyeSlash /> : <Eye />}
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        A senha deve ter pelo menos 6 caracteres.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formConfirmPassword">
                    <Form.Label className="fw-semibold small">Confirmar Senha</Form.Label>
                    <InputGroup className={`has-validation rounded-3 shadow-sm ${styles.customInputGroup}`}>
                      <InputGroup.Text className="bg-white text-muted border-end-0">
                        <Lock />
                      </InputGroup.Text>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        pattern={formData.password}
                        className="border-x-0 px-0"
                      />
                      <InputGroup.Text 
                        className="bg-white text-muted border-start-0"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ cursor: 'pointer' }}
                      >
                        {showConfirmPassword ? <EyeSlash /> : <Eye />}
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        As senhas não coincidem.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  {error && <div className="alert alert-danger mb-0 mt-4">{error}</div>}
                  {success && <div className="alert alert-success mb-0 mt-4">Conta criada com sucesso!</div>}

                  <div className="d-grid gap-2 mt-5">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg" 
                      className={`rounded-pill fw-bold shadow-sm ${styles.submitBtn}`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Criando conta...' : 'Criar Conta'}
                    </Button>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-muted small">
                      Já tem uma conta? <Link href="/login" className={`text-decoration-none fw-semibold ${styles.linkPrimary}`}>Fazer login</Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
