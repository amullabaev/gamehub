import { useState, useEffect } from 'react';
import './App.css';

import { getHealth } from './lib/api';
import Navigation from './components/navigation/Navigation';
import { Outlet } from 'react-router';

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
    <div className="flex">
      <Navigation></Navigation>
      <main className="p-4 w-full">
        <Outlet />
        <div style={{ marginTop: 20 }}>
          <strong>API Health Check:</strong>
          <pre>{health}</pre>
        </div>
      </main>
    </div>
  );
}

export default App;
