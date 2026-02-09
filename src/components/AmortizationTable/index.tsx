import styled from "styled-components";

const TableContainer = styled.div`
  margin: var(--space-xl) 0;
  animation: fadeIn 0.5s ease-in;
`;

const TableTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--text-dark);
  margin-bottom: var(--space-md);
  text-align: center;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  
  /* Scrollbar personalizado */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--bg-gray-light);
    border-radius: var(--radius-md);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-purple);
    border-radius: var(--radius-md);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

const Thead = styled.thead`
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-dark) 100%);
  color: white;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Th = styled.th`
  padding: 16px 12px;
  text-align: right;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;

  &:first-child {
    text-align: center;
    border-top-left-radius: var(--radius-lg);
  }

  &:last-child {
    border-top-right-radius: var(--radius-lg);
  }
`;

const Tbody = styled.tbody`
  tr:nth-child(even) {
    background: var(--bg-gray-light);
  }

  tr:hover {
    background: #f0f4ff;
    transition: background 0.2s ease;
  }
`;

const Td = styled.td`
  padding: 14px 12px;
  text-align: right;
  color: var(--text-medium);
  font-size: 0.9rem;
  border-bottom: 1px solid var(--border-light);

  &:first-child {
    text-align: center;
    font-weight: 600;
    color: var(--primary-purple);
  }
`;

const TotalRow = styled.tr`
  background: linear-gradient(135deg, #f0f4ff 0%, #e6e9ff 100%);
  font-weight: 700;
  
  td {
    border-bottom: none;
    padding: 16px 12px;
    color: var(--text-dark);
    font-size: 1rem;
  }

  td:first-child {
    color: var(--primary-dark);
  }
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: var(--space-2xl);
  color: var(--text-light);
  font-size: 1.1rem;
`;

interface PagoCuota {
  numero: number;
  saldo_inicial: number;
  cuota: number;
  interes: number;
  amortizacion: number;
  saldo_final: number;
}

interface AmortizationTableProps {
  tabla: PagoCuota[];
}

const AmortizationTable = ({ tabla }: AmortizationTableProps) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  if (!tabla || tabla.length === 0) {
    return (
      <TableContainer>
        <NoDataMessage>
          📊 No hay datos de amortización para mostrar
        </NoDataMessage>
      </TableContainer>
    );
  }

  // Calcular totales
  const totalCuota = tabla.reduce((sum, row) => sum + row.cuota, 0);
  const totalInteres = tabla.reduce((sum, row) => sum + row.interes, 0);
  const totalAmortizacion = tabla.reduce((sum, row) => sum + row.amortizacion, 0);

  return (
    <TableContainer>
      <TableTitle>📋 Tabla de Amortización Detallada</TableTitle>
      
      <TableWrapper>
        <Table>
          <Thead>
            <tr>
              <Th>#</Th>
              <Th>Saldo Inicial</Th>
              <Th>Cuota</Th>
              <Th>Interés</Th>
              <Th>Amortización</Th>
              <Th>Saldo Final</Th>
            </tr>
          </Thead>
          <Tbody>
            {tabla.map((row) => (
              <tr key={row.numero}>
                <Td>{row.numero}</Td>
                <Td>{formatCurrency(row.saldo_inicial)}</Td>
                <Td>{formatCurrency(row.cuota)}</Td>
                <Td>{formatCurrency(row.interes)}</Td>
                <Td>{formatCurrency(row.amortizacion)}</Td>
                <Td>{formatCurrency(row.saldo_final)}</Td>
              </tr>
            ))}
            <TotalRow>
              <Td>TOTAL</Td>
              <Td>-</Td>
              <Td>{formatCurrency(totalCuota)}</Td>
              <Td>{formatCurrency(totalInteres)}</Td>
              <Td>{formatCurrency(totalAmortizacion)}</Td>
              <Td>-</Td>
            </TotalRow>
          </Tbody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};

export default AmortizationTable;
