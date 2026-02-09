import { useState } from "react";
import styled from "styled-components";
import { useAuth, useLocalStorage } from "../hooks";
import { useNavigate } from "react-router-dom";
import { SimulationForm, Summary, AmortizationTable } from "../components";
import type { SimulationFormData } from "../components/SimulationForm";
import { simulationService } from "../services";
import axios from "axios";

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

const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #fc6767 0%, #ec4545 100%);
  color: white;
  padding: 16px 24px;
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-lg);
  text-align: center;
  font-weight: 500;
  box-shadow: var(--shadow-lg);
  animation: slideUp 0.3s ease-out;
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

interface ValidationError {
  type: string;
  loc: (string | number)[];
  msg: string;
  input?: unknown;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useLocalStorage<SimulationResult | null>("creditSimResult", null);
  const [error, setError] = useState<string | null>(null);

  const handleSimulate = async (data: SimulationFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Llamar a la API del backend
      const response = await simulationService.simulate({
        amount: data.monto,
        annual_rate: data.tasaAnual,
        term_months: data.plazoMeses,
      });
      
      // Transformar respuesta del backend al formato esperado por los componentes
      const tabla = response.amortization_table.map((row, index) => {
        // Calcular saldo inicial: para el primer mes es el monto total,
        // para los demás es el saldo final del mes anterior
        const saldo_inicial =
          index === 0
            ? response.amount
            : response.amortization_table[index - 1].balance;

        return {
          numero: row.month,
          saldo_inicial: saldo_inicial,
          cuota: row.payment,
          interes: row.interest,
          amortizacion: row.principal,
          saldo_final: row.balance,
        };
      });

      setSimulationResult({
        cuotaMensual: response.summary.monthly_payment,
        totalInteres: response.summary.total_interest,
        totalPagar: response.summary.total_payment,
        plazoMeses: response.term_months,
        tabla: tabla,
      });
    } catch (err: unknown) {
      console.error('Error al simular:', err);
      
      // Manejar diferentes tipos de errores
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          // Token expirado o inválido
          setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
          setTimeout(() => {
            logout();
            navigate('/login');
          }, 2000);
        } else if (err.response?.status === 422) {
          // Error de validación de Pydantic
          const detail = err.response.data?.detail;
          if (Array.isArray(detail)) {
            // Formatear errores de validación
            const errorMessages = detail.map((error: ValidationError) => error.msg).join(', ');
            setError(`Error de validación: ${errorMessages}`);
          } else if (typeof detail === 'string') {
            setError(detail);
          } else {
            setError('Error de validación en los datos enviados.');
          }
        } else if (err.response?.data?.detail) {
          // Error del backend con mensaje específico
          const detail = err.response.data.detail;
          setError(typeof detail === 'string' ? detail : 'Error al procesar la solicitud.');
        } else {
          // Error genérico
          setError('Error al simular el crédito. Por favor, intenta nuevamente.');
        }
      } else {
        // Error no relacionado con axios
        setError('Error inesperado. Por favor, intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = () => {
    // Limpiar resultados y errores cuando el usuario modifica los valores
    setSimulationResult(null);
    setError(null);
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
        <SimulationForm 
          onSubmit={handleSimulate} 
          loading={loading} 
          onChange={handleFormChange}
        />

        {/* Mensaje de error */}
        {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}

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

