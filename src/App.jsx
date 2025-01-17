import React from 'react';
import Timetable from './pages/Timetable';
import Auth from './pages/Auth';
import Result from './pages/Result';
import { StoreProvider } from './context/Context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculate from './pages/Calculate';
function App(){
    
    return (
        <StoreProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Auth/>}/>
                    <Route path='/timetable' element={<Timetable/>} />
                    <Route path='/calculate' element={<Calculate/>} />
                    <Route path='/result' element={<Result/>} />
                </Routes>
            </Router>
        </StoreProvider>
    );
}

export default App;
