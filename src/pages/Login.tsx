import { useState } from "react";
import type { FormEvent } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks";
import {
  validateEmail,
  validatePassword,
  limitLength,
  FIELD_LIMITS,
} from "../utils";

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
  width: 100%;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
  transition: color 0.2s ease;

  &:hover {
    color: #667eea;
  }

  &:focus {
    outline: none;
  }

  svg {
    width: 20px;
    height: 20px;
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

const FieldError = styled.span`
  color: #e53e3e;
  font-size: 0.85rem;
  margin-top: 4px;
  display: block;
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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleValidateEmail = (value: string): boolean => {
    const result = validateEmail(value);
    setEmailError(result.error);
    return result.isValid;
  };

  const handleValidatePassword = (value: string): boolean => {
    const result = validatePassword(value);
    setPasswordError(result.error);
    return result.isValid;
  };

  const handleEmailChange = (value: string) => {
    const limited = limitLength(value, FIELD_LIMITS.EMAIL_MAX);
    setEmail(limited);
    if (emailError) handleValidateEmail(limited);
  };

  const handlePasswordChange = (value: string) => {
    const limited = limitLength(value, FIELD_LIMITS.PASSWORD_MAX);
    setPassword(limited);
    if (passwordError) handleValidatePassword(limited);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validar campos antes de enviar
    const isEmailValid = handleValidateEmail(email);
    const isPasswordValid = handleValidatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

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
              type="text"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={(e) => handleValidateEmail(e.target.value)}
              disabled={loading}
              maxLength={FIELD_LIMITS.EMAIL_MAX}
              style={{ borderColor: emailError ? '#e53e3e' : '#e2e8f0' }}
            />
            {emailError && <FieldError>{emailError}</FieldError>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Contraseña</Label>
            <PasswordInputWrapper>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onBlur={(e) => handleValidatePassword(e.target.value)}
                disabled={loading}
                maxLength={FIELD_LIMITS.PASSWORD_MAX}
                style={{ borderColor: passwordError ? '#e53e3e' : '#e2e8f0' }}
              />
              <TogglePasswordButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </TogglePasswordButton>
            </PasswordInputWrapper>
            {passwordError && <FieldError>{passwordError}</FieldError>}
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
