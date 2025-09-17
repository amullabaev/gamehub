import { useState, useEffect } from 'react';
import './App.css';

import { getHealth } from './lib/api';
import Clicker from './components/clicker/Clicker';
import Navigation from './components/navigation/Navigation';

function App() {
  const [health, setHealth] = useState<string | null>(null);

  useEffect(() => {
    getHealth().then((res) => {
      setHealth(JSON.stringify(res.data));
      console.log('Health check response:', res.data);
    });
    return () => {};
  }, []);

  return (
    <>
      <Navigation></Navigation>

      <Clicker></Clicker>

      <div style={{ marginTop: 20 }}>
        <strong>API Health Check:</strong>
        <pre>{health}</pre>
      </div>
    </>
  );
}

export default App;
