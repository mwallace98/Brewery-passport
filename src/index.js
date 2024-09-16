import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home'
import Profile from './Components/profile';
import ListOfBreweries from './Components/ListOfBreweries'
import {Route,Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Favorites from './Components/favorites';
import BreweryDetails from './Components/brewery-details';


const App = () => {
  const [favorites,setFavorites] = useState([])

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'))
      setFavorites(storedFavorites)
  },[])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (brewery) => {
    console.log(favorites,'current favorites')
    setFavorites((prevFavorites) => {
      if (Array.isArray(prevFavorites) && !prevFavorites.some(fav => fav.id === brewery.id)) {
        const newFavorites = [...prevFavorites,brewery];
        localStorage.setItem('favorites',JSON.stringify(newFavorites))
        return [...prevFavorites, brewery];
      }
      return prevFavorites
    })
  }

  const removeFavorite =(breweryId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(fav => fav.id !== breweryId);
      localStorage.setItem('favorites',JSON.stringify(updatedFavorites))
      return updatedFavorites
    });
  };
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<Home favorites={favorites} addFavorite={addFavorite} />}/>
        <Route path='/profile' element={<Profile favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite}/>} />
        <Route path='/breweries' element={<ListOfBreweries />} />
        <Route path='/favorites' element={<Favorites favorites={favorites} removeFavorite={removeFavorite}/>} />
        <Route path='/details/:id' element={<BreweryDetails addFavorite={addFavorite} removeFavorite={removeFavorite}/>}/>
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




