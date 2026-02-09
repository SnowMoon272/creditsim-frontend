import styled from "styled-components";
import { useAuth, useLocalStorage } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #2d3748;
  margin: 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Email = styled.span`
  color: #718096;
  font-size: 0.95rem;
`;

const LogoutButton = styled.button`
  padding: 10px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #f56565;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background: #e53e3e;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Content = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 20px;
`;

const StatsCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 24px;
  margin-top: 30px;
  color: white;
`;

const StatsTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 16px 0;
  opacity: 0.9;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  font-size: 0.95rem;
  opacity: 0.9;
`;

const StatValue = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Hook useLocalStorage para demostrar persistencia
  const [visitCount, setVisitCount] = useLocalStorage("dashboardVisits", 0);
  const [lastVisit, setLastVisit] = useLocalStorage<string | null>("lastVisitDate", null);

  // Incrementar contador cada vez que se carga el dashboard
  //useEffect(() => {
  //  setVisitCount((prev) => prev + 1);
  //  setLastVisit(new Date().toLocaleString("es-ES"));
  //}, [setVisitCount, setLastVisit]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container>
      <Header>
        <Title>CreditSim - Dashboard</Title>
        <UserInfo>
          <Email>{user?.email}</Email>
          <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
        </UserInfo>
      </Header>

      <Content>
        <Message>¡Bienvenido al Dashboard!</Message>
        <Message style={{ fontSize: "1rem", color: "#718096" }}>
          El simulador de crédito se implementará en la siguiente fase.
        </Message>

        <StatsCard>
          <StatsTitle>📊 Hook useLocalStorage en Acción</StatsTitle>
          <StatItem>
            <StatLabel>Visitas al Dashboard:</StatLabel>
            <StatValue>{visitCount}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Última Visita:</StatLabel>
            <StatValue>{lastVisit || "Primera vez"}</StatValue>
          </StatItem>
          <Message style={{ fontSize: "0.85rem", marginTop: "16px", marginBottom: "0" }}>
            💡 Estos datos persisten al recargar la página usando localStorage
          </Message>
        </StatsCard>
      </Content>
    </Container>
  );
};

export default Dashboard;

