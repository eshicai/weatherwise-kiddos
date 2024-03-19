import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WeatherWiseCentral } from './Pages/WeatherWiseCentral/WeatherWiseCentral.js';
import { NotFound } from './Pages/NotFound/NotFound.js';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<WeatherWiseCentral />} />

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
