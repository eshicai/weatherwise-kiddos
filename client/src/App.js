import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home/Home.js';
import { Tomorrow } from './pages/Tomorrow/Tomorrow.js';
import { DayAfterTomorrow } from './pages/DayAfterTomorrow/DayAfterTomorrow.js';
import { InThreeDays } from './pages/InThreeDays/InThreeDays.js';
import { InFourDays } from './pages/InFourDays/InFourDays.js';
import { NotFound } from './pages/NotFound/NotFound.js';
import { Login } from './pages/Login/Login.jsx';
import { Logout } from './pages/Logout/Logout.jsx';
import { Feedback } from './pages/Feedback/Feedback.jsx';
import { useState } from 'react';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />} />
          <Route path='/tomorrow' element={<Tomorrow />} />
          <Route path='/day_after_tomorrow' element={<DayAfterTomorrow />} />
          <Route path='/in_three_days' element={<InThreeDays />} />
          <Route path='/in_four_days' element={<InFourDays />} />          
          <Route
            path='/login'
            element={isUserLoggedIn ? <Navigate to='/' /> : <Login isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />} />
          
          <Route
            path='/logout'
            element={isUserLoggedIn ? <Logout isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} /> : <Navigate to='/' /> } />

          <Route path='/feedback/:id' element={isUserLoggedIn ? <Feedback isUserLoggedIn={isUserLoggedIn} /> : <Navigate to='/login' />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
