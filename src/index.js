import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Deps
// npx create-react-app . --template minimal
// npm install three @react-three/fiber @react-three/drei @react-three/postprocessing