import { useState, useEffect } from 'react';
import './App.css';

import { getHealth } from './lib/api';
import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar';

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
    <SidebarProvider>
      <AppSidebar />
      <div className="flex">
        <main className="p-4 w-full">
          <SidebarTrigger />
          <Outlet />
          <div style={{ marginTop: 20 }}>
            <strong>API Health Check:</strong>
            <pre>{health}</pre>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
