import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home.js';
import { Tomorrow } from './pages/Tomorrow/Tomorrow.js';
import { DayAfterTomorrow } from './pages/DayAfterTomorrow/DayAfterTomorrow.js';
import { InThreeDays } from './pages/InThreeDays/InThreeDays.js';
import { InFourDays } from './pages/InFourDays/InFourDays.js';
import { NotFound } from './pages/NotFound/NotFound.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tomorrow' element={<Tomorrow />} />
          <Route path='/day_after_tomorrow' element={<DayAfterTomorrow />} />
          <Route path='/in_three_days' element={<InThreeDays />} />
          <Route path='/in_four_days' element={<InFourDays />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
