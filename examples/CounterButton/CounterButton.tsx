import React, { useState } from 'react'
export const CounterButton = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <span className="count">{count}</span>
      <button type="button" onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  )
}
