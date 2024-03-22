import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WeatherWiseCentral } from './pages/WeatherWiseCentral/WeatherWiseCentral.js';
import { Tomorrow } from './pages/Tomorrow/Tomorrow.js';
import { NotFound } from './pages/NotFound/NotFound.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WeatherWiseCentral />} />

          <Route path='/tomorrow' element={<Tomorrow />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
