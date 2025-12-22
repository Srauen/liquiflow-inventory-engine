
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("LiquiFlow Terminal: Initializing mount sequence...");

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Critical Failure: Root mount point 'root' not found in DOM.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("LiquiFlow Terminal: Mount successful. System online.");
  } catch (error) {
    console.error("Critical Failure during React hydration:", error);
  }
};

// Ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
