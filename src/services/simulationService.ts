import api from './api';

/**
 * Interfaz para los datos de entrada de la simulación
 */
export interface SimulationRequest {
  amount: number;
  annual_rate: number;
  term_months: number;
}

/**
 * Interfaz para la tabla de amortización
 */
export interface PaymentRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/**
 * Interfaz para el resumen de la simulación
 */
export interface SimulationSummary {
  monthly_payment: number;
  total_payment: number;
  total_interest: number;
}

/**
 * Interfaz para la respuesta de la simulación
 */
export interface SimulationResponse {
  amount: number;
  annual_rate: number;
  term_months: number;
  summary: SimulationSummary;
  amortization_table: PaymentRow[];
}

/**
 * Servicio para gestionar simulaciones de crédito
 */
const simulationService = {
  /**
   * Simula un crédito enviando los datos al backend
   * @param data - Datos de la simulación (monto, tasa, plazo)
   * @returns Promesa con los resultados de la simulación
   */
  simulate: async (data: SimulationRequest): Promise<SimulationResponse> => {
    try {
      const response = await api.post<SimulationResponse>('/simulate', data);
      return response.data;
    } catch (error) {
      console.error('Error al simular crédito:', error);
      throw error;
    }
  },
};

export default simulationService;
