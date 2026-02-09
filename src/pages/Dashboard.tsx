import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { SimulationForm, Summary, AmortizationTable } from "../components";
import type { SimulationFormData } from "../components/SimulationForm";

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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #2d3748;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
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
  max-width: 1200px;
  margin: 0 auto;
`;

interface PagoCuota {
  numero: number;
  saldo_inicial: number;
  cuota: number;
  interes: number;
  amortizacion: number;
  saldo_final: number;
}

interface SimulationResult {
  cuotaMensual: number;
  totalInteres: number;
  totalPagar: number;
  plazoMeses: number;
  tabla: PagoCuota[];
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  // Calcular amortización usando Sistema Francés (cuota fija)
  const calcularAmortizacion = (
    monto: number,
    tasaAnual: number,
    plazoMeses: number
  ): SimulationResult => {
    const tasaMensual = tasaAnual / 100 / 12;
    
    // Fórmula de cuota fija: C = P * (i * (1 + i)^n) / ((1 + i)^n - 1)
    const cuotaMensual =
      (monto * tasaMensual * Math.pow(1 + tasaMensual, plazoMeses)) /
      (Math.pow(1 + tasaMensual, plazoMeses) - 1);

    const tabla: PagoCuota[] = [];
    let saldoActual = monto;

    for (let mes = 1; mes <= plazoMeses; mes++) {
      const interes = saldoActual * tasaMensual;
      const amortizacion = cuotaMensual - interes;
      const saldoFinal = saldoActual - amortizacion;

      tabla.push({
        numero: mes,
        saldo_inicial: saldoActual,
        cuota: cuotaMensual,
        interes: interes,
        amortizacion: amortizacion,
        saldo_final: Math.max(0, saldoFinal), // Evitar negativos por redondeo
      });

      saldoActual = saldoFinal;
    }

    const totalPagar = cuotaMensual * plazoMeses;
    const totalInteres = totalPagar - monto;

    return {
      cuotaMensual,
      totalInteres,
      totalPagar,
      plazoMeses,
      tabla,
    };
  };

  const handleSimulate = (data: SimulationFormData) => {
    // Simular loading
    setLoading(true);
    
    // Simular delay de API
    setTimeout(() => {
      const result = calcularAmortizacion(
        data.monto,
        data.tasaAnual,
        data.plazoMeses
      );
      
      setSimulationResult(result);
      setLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container>
      <Header>
        <Title>💳 CreditSim - Simulador de Crédito</Title>
        <UserInfo>
          <Email>{user?.email}</Email>
          <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
        </UserInfo>
      </Header>

      <Content>
        {/* Formulario de simulación */}
        <SimulationForm onSubmit={handleSimulate} loading={loading} />

        {/* Resultados de la simulación */}
        {simulationResult && (
          <>
            <Summary
              cuotaMensual={simulationResult.cuotaMensual}
              totalInteres={simulationResult.totalInteres}
              totalPagar={simulationResult.totalPagar}
              plazoMeses={simulationResult.plazoMeses}
            />

            <AmortizationTable tabla={simulationResult.tabla} />
          </>
        )}
      </Content>
    </Container>
  );
};

export default Dashboard;

