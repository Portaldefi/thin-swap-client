import { Provider } from 'react-redux'
import { store } from './store/store'
import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SubmarineSwap from './submarine/SubmarineSwap.jsx'
import OrdinalSwap from './ordinal/OrdinalSwap.jsx'
import Home from './Home.jsx'

const App = () => <Provider store={store}>
    <Router>
        <div className="App">


            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/submarine" element={<SubmarineSwap/>}>
                </Route>
                <Route path="/ordinal" element={<OrdinalSwap/>}>
                </Route>
            </Routes>
        </div>
    </Router>
</Provider>

export default App
