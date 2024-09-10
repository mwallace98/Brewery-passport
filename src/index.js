import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './Home'
import Profile from './Components/profile';
import ListOfBreweries from './Components/ListOfBreweries'
import { Router,Route,Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Favorites from './Components/favorites';
import BreweryDetails from './Components/brewery-details';

const App = () => {
  const [favorites,setFavorites] = useState(['test Favorite','test Favorite 2'])

  const addFavorite = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites,item]);
  }

  const removeFavorites = (item) => {
    setFavorites((prevFavorites) => 
      prevFavorites.filter((favorite) => favorite !== item)
    )
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorites}
            />
          }
        />
        <Route
          path='/profile'
          element={
            <Profile
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorites}
            />
          }
        />
        <Route path='/breweries' element={<ListOfBreweries />} />
        <Route path='/favorites' element={<Favorites favorites={favorites} />} />
        <Route path='/details' element={<BreweryDetails />}/>
      </Routes>
    </BrowserRouter>
  );
  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




