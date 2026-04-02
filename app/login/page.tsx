"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLogin } from '../../hooks/useLogin';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Envelope, Lock, Eye, EyeSlash } from 'react-bootstrap-icons';
import { useRouter } from 'next/navigation';
import styles from './Style.module.css';

export default function LoginPage() {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login, isLoading, error, success } = useLogin();

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
    
    setValidated(true);

    const result = await login({
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      router.push('/dashboard')
    }
  };

  return (
    <div className={`${styles.loginWrapper} d-flex align-items-center justify-content-center min-vh-100`}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={4}>
            <Card className={`shadow-lg border-0 ${styles.loginCard}`}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className={`fw-bold ${styles.textGradient} mb-2`}>Bem-vindo(a)</h2>
                  <p className="text-muted">Acesse sua conta para continuar</p>
                </div>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                        Por favor, insira sua senha.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <div className="d-flex justify-content-end mb-4">
                    <Link href="/recuperar-senha" className={`text-decoration-none small ${styles.linkPrimary}`}>
                      Esqueceu sua senha?
                    </Link>
                  </div>

                  {error && <div className="alert alert-danger mb-0 mt-2">{error}</div>}
                  {success && <div className="alert alert-success mb-0 mt-2">Login realizado com sucesso! Redirecionando...</div>}

                  <div className="d-grid gap-2 mt-4">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg" 
                      className={`rounded-pill fw-bold shadow-sm ${styles.submitBtn}`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-muted small">
                      Ainda não tem uma conta? <Link href="/signup" className={`text-decoration-none fw-semibold ${styles.linkPrimary}`}>Criar conta</Link>
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
