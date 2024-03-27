import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home/Home.js';
import { Tomorrow } from './pages/Tomorrow/Tomorrow.js';
import { DayAfterTomorrow } from './pages/DayAfterTomorrow/DayAfterTomorrow.js';
import { InThreeDays } from './pages/InThreeDays/InThreeDays.js';
import { InFourDays } from './pages/InFourDays/InFourDays.js';
import { NotFound } from './pages/NotFound/NotFound.js';
import { Login } from './pages/Login/Login.jsx';
import { Feedback } from './pages/Feedback/Feedback.jsx';

function App() {
  const user = false;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home user={user} />} />
          <Route path='/tomorrow' element={<Tomorrow />} />
          <Route path='/day_after_tomorrow' element={<DayAfterTomorrow />} />
          <Route path='/in_three_days' element={<InThreeDays />} />
          <Route path='/in_four_days' element={<InFourDays />} />

          {/* <Route path='/login' element={<Login />} /> */}
          <Route
            path='/login'
            element={user ? <Navigate to='/' /> : <Login user={user} />} />

          <Route path='/feedback/:id' element={user ? <Feedback user={user} /> : <Navigate to='/login' />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
