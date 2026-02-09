import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #718096;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;

  ${(props) =>
    props.variant === "primary"
      ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }
  `
      : `
    background: transparent;
    color: #667eea;
    border: 2px solid #667eea;
    
    &:hover {
      background: #667eea;
      color: white;
      transform: translateY(-2px);
    }
  `}

  &:active {
    transform: translateY(0);
  }
`;

const Feature = styled.div`
  margin-top: 40px;
  padding-top: 40px;
  border-top: 1px solid #e2e8f0;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
  text-align: left;
`;

const FeatureItem = styled.li`
  color: #4a5568;
  padding: 8px 0;
  font-size: 1rem;

  &:before {
    content: "✓";
    color: #667eea;
    font-weight: bold;
    margin-right: 10px;
  }
`;

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Card>
        <Title>CreditSim</Title>
        <Subtitle>
          Simula tu crédito y visualiza tu tabla de amortización de forma fácil y rápida
        </Subtitle>

        <ButtonGroup>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </Button>
          <Button variant="secondary" onClick={() => navigate("/register")}>
            Registrarse
          </Button>
        </ButtonGroup>

        <Feature>
          <FeatureList>
            <FeatureItem>Cálculo automático de cuotas mensuales</FeatureItem>
            <FeatureItem>Tabla de amortización detallada</FeatureItem>
            <FeatureItem>Sistema francés de amortización</FeatureItem>
            <FeatureItem>100% gratuito y seguro</FeatureItem>
          </FeatureList>
        </Feature>
      </Card>
    </Container>
  );
};

export default Welcome;

