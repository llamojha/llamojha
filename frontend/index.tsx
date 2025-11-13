
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DynamicBackground from './components/DynamicBackground';
import AnimationSwitcher from './components/AnimationSwitcher';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const Main = () => {
  const [animationMode, setAnimationMode] = useState('rain');

  return (
    <React.StrictMode>
      <div className="relative isolate">
        <DynamicBackground mode={animationMode} />
        <AnimationSwitcher currentMode={animationMode} onModeChange={setAnimationMode} />
        <App />
      </div>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(rootElement);
root.render(<Main />);
