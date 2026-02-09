import { useState } from "react";
import type { FormEvent } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 450px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #718096;
  margin-bottom: 40px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Button = styled.button`
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  margin-top: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fed7d7;
  color: #c53030;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  border-left: 4px solid #c53030;
`;

const Footer = styled.div`
  margin-top: 24px;
  text-align: center;
  font-size: 0.9rem;
  color: #718096;
`;

const StyledLink = styled(Link)`
  color: #667eea;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email.toLowerCase(), password);
      navigate("/dashboard");
    } catch (err) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(
        error.response?.data?.detail || 
        "Error al iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Iniciar Sesión</Title>
        <Subtitle>Ingresa tus credenciales para continuar</Subtitle>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          </FormGroup>

          <Button type="submit" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </Form>

        <Footer>
          ¿No tienes cuenta?{" "}
          <StyledLink to="/register">Regístrate aquí</StyledLink>
        </Footer>
      </Card>
    </Container>
  );
};

export default Login;
