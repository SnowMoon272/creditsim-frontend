import styled from "styled-components";

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
  margin: var(--space-xl) 0;
`;

const SummaryCard = styled.div<{ $color?: string }>`
  background: ${(props) => props.$color || "linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-dark) 100%)"};
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  color: white;
  box-shadow: var(--shadow-lg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: slideUp 0.4s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
  }
`;

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: var(--space-sm);
`;

const CardLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.95;
  margin-bottom: var(--space-xs);
  font-weight: 500;
`;

const CardValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--space-xs);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CardSubtext = styled.div`
  font-size: 0.8rem;
  opacity: 0.85;
`;

interface SummaryProps {
  cuotaMensual: number;
  totalInteres: number;
  totalPagar: number;
  plazoMeses: number;
}

const Summary = ({ cuotaMensual, totalInteres, totalPagar, plazoMeses }: SummaryProps) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <SummaryContainer>
      <SummaryCard $color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
        <CardIcon>💵</CardIcon>
        <CardLabel>Cuota Mensual</CardLabel>
        <CardValue>{formatCurrency(cuotaMensual)}</CardValue>
        <CardSubtext>Pagarás cada mes durante {plazoMeses} meses</CardSubtext>
      </SummaryCard>

      <SummaryCard $color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
        <CardIcon>📈</CardIcon>
        <CardLabel>Total Intereses</CardLabel>
        <CardValue>{formatCurrency(totalInteres)}</CardValue>
        <CardSubtext>Costo total del crédito</CardSubtext>
      </SummaryCard>

      <SummaryCard $color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
        <CardIcon>💰</CardIcon>
        <CardLabel>Total a Pagar</CardLabel>
        <CardValue>{formatCurrency(totalPagar)}</CardValue>
        <CardSubtext>Capital + Intereses</CardSubtext>
      </SummaryCard>
    </SummaryContainer>
  );
};

export default Summary;
