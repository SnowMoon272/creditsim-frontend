import { createGlobalStyle } from "styled-components";

/**
 * Estilos globales para la aplicación CreditSim
 * Define reset CSS, variables de tema y estilos base
 */
export const GlobalStyles = createGlobalStyle`
  /* Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Variables CSS para colores del tema */
  :root {
    /* Colores principales */
    --primary-purple: #667eea;
    --primary-dark: #764ba2;
    
    /* Colores de texto */
    --text-dark: #2d3748;
    --text-medium: #4a5568;
    --text-light: #718096;
    --text-lighter: #a0aec0;
    
    /* Colores de fondo */
    --bg-white: #ffffff;
    --bg-gray-light: #f7fafc;
    --bg-gray: #edf2f7;
    
    /* Colores de borde */
    --border-light: #e2e8f0;
    --border-medium: #cbd5e0;
    
    /* Colores de estado */
    --success: #48bb78;
    --error: #f56565;
    --warning: #ed8936;
    --info: #4299e1;
    
    /* Sombras */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
    
    /* Border radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    
    /* Espaciado */
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    --space-2xl: 48px;
  }

  /* Estilos base */
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--text-dark);
    background-color: var(--bg-white);
    line-height: 1.6;
  }

  #root {
    min-height: 100vh;
  }

  /* Estilos para scrollbar (Chrome, Safari, Edge) */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-gray-light);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border-medium);
    border-radius: var(--radius-md);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--text-light);
  }

  /* Estilos para inputs y buttons en general */
  input, button, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Estilos para links */
  a {
    color: var(--primary-purple);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: var(--primary-dark);
  }

  /* Estilos para listas */
  ul, ol {
    list-style: none;
  }

  /* Helpers de utilidad */
  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .text-left {
    text-align: left;
  }

  .mt-1 { margin-top: var(--space-sm); }
  .mt-2 { margin-top: var(--space-md); }
  .mt-3 { margin-top: var(--space-lg); }
  .mt-4 { margin-top: var(--space-xl); }

  .mb-1 { margin-bottom: var(--space-sm); }
  .mb-2 { margin-bottom: var(--space-md); }
  .mb-3 { margin-bottom: var(--space-lg); }
  .mb-4 { margin-bottom: var(--space-xl); }

  .hidden {
    display: none;
  }

  /* Animaciones de entrada */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }

  .slide-up {
    animation: slideUp 0.4s ease-out;
  }
`;

export default GlobalStyles;
