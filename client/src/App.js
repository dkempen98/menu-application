import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import Drink from './pages/Drink';
import DrinkCategory from './pages/DrinkCategory';
import Drinks from './pages/Drinks';
import LandingPage from './pages/LandingPage';
import Error from './pages/ErrorPage';

function App() {
  return (
      <Router>
        <div>
          {/* <Navbar /> */}
          <div className="container">
            <Routes>
              <Route 
                path="/"
                element={<LandingPage />}
              />
              <Route 
                path="/drinks"
                element={<Drinks />}
              />
              <Route 
                path="/drinks/:category"
                element={<DrinkCategory />}
              />
              <Route 
                path="/drinks/:category/:drink"
                element={<Drink />}
              />
              <Route
                path="/error"
                element={<Error />}
              />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
