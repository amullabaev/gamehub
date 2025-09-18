import { useState } from 'react';
import { Button } from '../../ui/button';

function Clicker() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="card">
        <button>count is {count}</button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Button onClick={() => setCount((count) => count + 1)}>Click me</Button>
      </div>
    </>
  );
}

export default Clicker;
