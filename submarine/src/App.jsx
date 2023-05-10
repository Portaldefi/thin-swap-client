import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SwapDemo from './SwapDemo.jsx'
import { store } from './store/store'
import { Provider } from 'react-redux'

function App() {
  const [count, setCount] = useState(0)

  return (
        <Provider store={store}>
            <div className="App">
                <SwapDemo />
            </div>
        </Provider>
  )
}

export default App
