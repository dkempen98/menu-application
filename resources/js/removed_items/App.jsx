import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StateProvider } from './StateContext.jsx';
import Drink from './pages/Drink.jsx';
import DrinkCategory from './pages/DrinkCategory.jsx';
import Drinks from './pages/Drinks.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Footer from './components/Footer.jsx';
import Error from './pages/ErrorPage.jsx';

import './App.css';

function App() {
  return (
      <StateProvider>
        <Router>
          <div>
             {/*<Navbar /> */}
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
          <Footer/>
        </Router>
      </StateProvider>

  );
}

export default App;
