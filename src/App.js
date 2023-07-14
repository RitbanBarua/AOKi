import './App.css';
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import SignUp from './components/SignUp';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import LoadingState from './context/loading/LoadingState';
import Catalogue from './components/Catalogue';
import Watchlist from './components/Watchlist'
import About from './components/About'
import Terms from './components/TermsConditions';
import StreamingPage from './components/StreamingPage';
import EpisodesList from './components/EpisodesList';
import EpisodeIndex from './context/streamingEpisodeIndex/EpisodeIndex';
import ErrorState from './context/error/ErrorState';

function App() {
  const [signupData, setSignupData] = useState({
    'name': '',
    'email': '',
    'password': '',
  })

  return (
    <>
      <LoadingState>
        <EpisodeIndex>
          <ErrorState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path={"/watch/:animeId"} element={<StreamingPage />} />  {/* ${animeTitle.trim().replace(" ", "+")} */}
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp signupData={signupData} setSignupData={setSignupData} />} />
              <Route path='/terms-conditions' element={<Terms />} />
              <Route path='/list' element={<EpisodesList />} />
            </Routes>
          </BrowserRouter>
          </ErrorState>
        </EpisodeIndex>
      </LoadingState>
    </>
  );
}

export default App;
