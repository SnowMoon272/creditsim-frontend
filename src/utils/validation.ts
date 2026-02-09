/**
 * Utilidades para validación de formularios
 */

/**
 * Regex mejorado para validación de email
 * Valida formato estándar: usuario@dominio.extensión
 * - Permite letras, números, punto, guión bajo y guión medio
 * - Requiere @ en el medio
 * - Requiere dominio válido con extensión de al menos 2 caracteres
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9][.a-zA-Z0-9_-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

/**
 * Límites de caracteres para campos
 */
export const FIELD_LIMITS = {
  EMAIL_MAX: 25,
  PASSWORD_MAX: 25,
  PASSWORD_MIN: 6,
} as const;

/**
 * Mensajes de error estandarizados
 */
export const ERROR_MESSAGES = {
  EMAIL_REQUIRED: "El email es requerido",
  EMAIL_INVALID: "Ingresa un email válido (ejemplo: usuario@dominio.com)",
  EMAIL_TOO_LONG: `El email no puede tener más de ${FIELD_LIMITS.EMAIL_MAX} caracteres`,
  
  PASSWORD_REQUIRED: "La contraseña es requerida",
  PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${FIELD_LIMITS.PASSWORD_MIN} caracteres`,
  PASSWORD_TOO_LONG: `La contraseña no puede tener más de ${FIELD_LIMITS.PASSWORD_MAX} caracteres`,
  
  CONFIRM_PASSWORD_REQUIRED: "Debes confirmar la contraseña",
  PASSWORDS_DONT_MATCH: "Las contraseñas no coinciden",
} as const;

/**
 * Resultado de validación
 */
export interface ValidationResult {
  isValid: boolean;
  error: string;
}

/**
 * Valida el formato y longitud de un email
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: ERROR_MESSAGES.EMAIL_REQUIRED };
  }
  
  if (email.length > FIELD_LIMITS.EMAIL_MAX) {
    return { isValid: false, error: ERROR_MESSAGES.EMAIL_TOO_LONG };
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, error: ERROR_MESSAGES.EMAIL_INVALID };
  }
  
  return { isValid: true, error: "" };
};

/**
 * Valida la longitud de una contraseña
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: ERROR_MESSAGES.PASSWORD_REQUIRED };
  }
  
  if (password.length > FIELD_LIMITS.PASSWORD_MAX) {
    return { isValid: false, error: ERROR_MESSAGES.PASSWORD_TOO_LONG };
  }
  
  if (password.length < FIELD_LIMITS.PASSWORD_MIN) {
    return { isValid: false, error: ERROR_MESSAGES.PASSWORD_TOO_SHORT };
  }
  
  return { isValid: true, error: "" };
};

/**
 * Valida que la confirmación de contraseña coincida
 */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED };
  }
  
  if (confirmPassword !== password) {
    return { isValid: false, error: ERROR_MESSAGES.PASSWORDS_DONT_MATCH };
  }
  
  return { isValid: true, error: "" };
};

/**
 * Limita la longitud de un string
 */
export const limitLength = (value: string, maxLength: number): string => {
  return value.slice(0, maxLength);
};
