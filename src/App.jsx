import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SwapCreate from './SwapCreate.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     <SwapCreate />
    </div>
  )
}

export default App
