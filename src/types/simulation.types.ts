/**
 * Tipos relacionados con simulación de crédito.
 * 
 * Estos tipos deben coincidir exactamente con los schemas de Pydantic
 * del backend (app/schemas/simulation.py)
 */

// ============================================
// REQUESTS (peticiones al backend)
// ============================================

/**
 * Datos para solicitar una simulación de crédito
 * Backend: SimulationRequest
 * 
 * Validaciones:
 * - amount: > 0
 * - annual_rate: > 0 y <= 100
 * - term_months: >= 1 y <= 360
 */
export interface SimulationRequest {
  amount: number;        // Monto del crédito
  annual_rate: number;   // Tasa anual (ej: 12.5 para 12.5%)
  term_months: number;   // Plazo en meses
}

// ============================================
// RESPONSES (respuestas del backend)
// ============================================

/**
 * Una fila de la tabla de amortización
 * Backend: PaymentRow
 */
export interface PaymentRow {
  month: number;         // Número de mes (1-N)
  payment: number;       // Cuota mensual fija
  principal: number;     // Abono a capital
  interest: number;      // Interés del mes
  balance: number;       // Saldo restante
}

/**
 * Resumen de la simulación
 * Backend: SimulationSummary
 */
export interface SimulationSummary {
  monthly_payment: number;   // Cuota mensual fija
  total_payment: number;     // Total a pagar
  total_interest: number;    // Total de intereses
}

/**
 * Respuesta completa de simulación
 * Backend: SimulationResponse
 */
export interface SimulationResponse {
  amount: number;                      // Monto solicitado (echo)
  annual_rate: number;                 // Tasa anual (echo)
  term_months: number;                 // Plazo en meses (echo)
  summary: SimulationSummary;          // Resumen con totales
  amortization_table: PaymentRow[];    // Tabla completa
}
