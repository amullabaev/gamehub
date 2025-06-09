import { useState, useEffect } from 'react'
import './App.css'
import { Button } from './components/ui/button'

import { getHealth } from './lib/api'

function App() {
  const [count, setCount] = useState(0)
  const [health, setHealth] = useState<string | null>(null)

  useEffect(() => {
    getHealth()
      .then((res) => {
        setHealth(JSON.stringify(res.data))
        console.log('Health check response:', res.data)
      })
      return () => {}
  }, [])

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button>
          count is {count}
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Button onClick={() => setCount((count) => count + 1)}>Click me</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <strong>API Health Check:</strong>
        <pre>{health}</pre>
      </div>
    </>
  )
}

export default App
