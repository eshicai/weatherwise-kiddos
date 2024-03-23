import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home.js';
import { Tomorrow } from './pages/Tomorrow/Tomorrow.js';
import { NotFound } from './pages/NotFound/NotFound.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/tomorrow' element={<Tomorrow />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
