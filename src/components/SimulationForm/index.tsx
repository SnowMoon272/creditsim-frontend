import { useState } from "react";
import type { FormEvent } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-lg);
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--text-dark);
  margin-bottom: var(--space-lg);
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid var(--border-light);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  background: var(--bg-white);
  color: var(--text-dark);

  &:focus {
    outline: none;
    border-color: var(--primary-purple);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background: var(--bg-gray-light);
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--text-lighter);
  }
`;

const HelpText = styled.span`
  font-size: 0.85rem;
  color: var(--text-light);
`;

const ErrorText = styled.span`
  font-size: 0.85rem;
  color: var(--error);
  font-weight: 500;
`;

const Button = styled.button`
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-dark) 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  margin-top: var(--space-md);

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
    transform: none;
  }
`;

interface SimulationFormProps {
  onSubmit: (data: SimulationFormData) => void;
  loading?: boolean;
}

export interface SimulationFormData {
  monto: number;
  tasaAnual: number;
  plazoMeses: number;
}

const SimulationForm = ({ onSubmit, loading = false }: SimulationFormProps) => {
  const [monto, setMonto] = useState<string>("");
  const [tasaAnual, setTasaAnual] = useState<string>("");
  const [plazoMeses, setPlazoMeses] = useState<string>("");
  const [errors, setErrors] = useState<Partial<SimulationFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<SimulationFormData> = {};

    // Validar monto
    const montoNum = parseFloat(monto);
    if (!monto || isNaN(montoNum)) {
      newErrors.monto = 1;
    } else if (montoNum <= 0) {
      newErrors.monto = 1;
    } else if (montoNum > 1000000) {
      newErrors.monto = 1;
    }

    // Validar tasa anual
    const tasaNum = parseFloat(tasaAnual);
    if (!tasaAnual || isNaN(tasaNum)) {
      newErrors.tasaAnual = 1;
    } else if (tasaNum <= 0 || tasaNum > 100) {
      newErrors.tasaAnual = 1;
    }

    // Validar plazo
    const plazoNum = parseInt(plazoMeses);
    if (!plazoMeses || isNaN(plazoNum)) {
      newErrors.plazoMeses = 1;
    } else if (plazoNum < 1 || plazoNum > 360) {
      newErrors.plazoMeses = 1;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      monto: parseFloat(monto),
      tasaAnual: parseFloat(tasaAnual),
      plazoMeses: parseInt(plazoMeses),
    });
  };

  const handleMontoChange = (value: string) => {
    // Solo permitir números y punto decimal
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setMonto(value);
      if (errors.monto) {
        setErrors({ ...errors, monto: undefined });
      }
    }
  };

  const handleTasaChange = (value: string) => {
    // Solo permitir números y punto decimal
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setTasaAnual(value);
      if (errors.tasaAnual) {
        setErrors({ ...errors, tasaAnual: undefined });
      }
    }
  };

  const handlePlazoChange = (value: string) => {
    // Solo permitir números enteros
    if (value === "" || /^\d+$/.test(value)) {
      setPlazoMeses(value);
      if (errors.plazoMeses) {
        setErrors({ ...errors, plazoMeses: undefined });
      }
    }
  };

  return (
    <FormContainer>
      <FormTitle>💳 Simulador de Crédito</FormTitle>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="monto">
            💰 Monto del Crédito
          </Label>
          <Input
            id="monto"
            type="text"
            placeholder="Ej: 10000"
            value={monto}
            onChange={(e) => handleMontoChange(e.target.value)}
            disabled={loading}
          />
          {errors.monto ? (
            <ErrorText>Ingresa un monto válido (entre $1 y $1,000,000)</ErrorText>
          ) : (
            <HelpText>Monto entre $1 y $1,000,000</HelpText>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="tasaAnual">
            📊 Tasa de Interés Anual (%)
          </Label>
          <Input
            id="tasaAnual"
            type="text"
            placeholder="Ej: 12.5"
            value={tasaAnual}
            onChange={(e) => handleTasaChange(e.target.value)}
            disabled={loading}
          />
          {errors.tasaAnual ? (
            <ErrorText>Ingresa una tasa válida (entre 0.01% y 100%)</ErrorText>
          ) : (
            <HelpText>Tasa anual entre 0.01% y 100%</HelpText>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="plazoMeses">
            📅 Plazo (meses)
          </Label>
          <Input
            id="plazoMeses"
            type="text"
            placeholder="Ej: 12"
            value={plazoMeses}
            onChange={(e) => handlePlazoChange(e.target.value)}
            disabled={loading}
          />
          {errors.plazoMeses ? (
            <ErrorText>Ingresa un plazo válido (entre 1 y 360 meses)</ErrorText>
          ) : (
            <HelpText>Plazo entre 1 y 360 meses (30 años máximo)</HelpText>
          )}
        </FormGroup>

        <Button type="submit" disabled={loading}>
          {loading ? "Calculando..." : "🎯 Simular Crédito"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default SimulationForm;
