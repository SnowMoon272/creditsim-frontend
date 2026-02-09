import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  gap: 20px;
`;

const SpinnerRing = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Text = styled.p`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

const Spinner = () => {
  return (
    <Container>
      <SpinnerRing />
      <Text>Cargando...</Text>
    </Container>
  );
};

export default Spinner;
