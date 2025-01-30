import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home'
import Profile from './components/profile';
import ListOfBreweries from './components/listOfBreweries';
import {json, Route,Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Favorites from './components/favorites';
import BreweryDetails from './Components/brewery-details';
import CheckIn from './components/check-in';
import Passport from './components/passport';




const App = () => {
  const [favorites,setFavorites] = useState([])
  const [stampedBreweries,setStampedBreweries] = useState([])

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'))
    const stampedBreweries = JSON.parse(localStorage.getItem('stamped'))
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
    if(stampedBreweries){
      setStampedBreweries(stampedBreweries)
    }
  },[])


  const addFavorite = (brewery) => {
    setFavorites((prevFavorites) => {
      if (Array.isArray(prevFavorites) && !prevFavorites.some(fav => fav.id === brewery.id)) {
        const newFavorites = [...prevFavorites,brewery];
        localStorage.setItem('favorites',JSON.stringify(newFavorites))
        return [...prevFavorites, brewery];
      }
      return prevFavorites
    })
  }

  const removeFavorite = (brewery) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(fav => fav.id !==brewery.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites
    })
  }

  const addStamped = (brewery) => {
    console.log('stamped inside index')
    setStampedBreweries((prevStampedBreweries) => {
      if(Array.isArray(prevStampedBreweries) && !prevStampedBreweries.some(stamped => stamped.id === brewery.id)){
        const newStampedBreweries = [...prevStampedBreweries,brewery];
        localStorage.setItem('stamped',JSON.stringify(newStampedBreweries));
        return newStampedBreweries
      }
      return prevStampedBreweries
    })
  } 
 
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<ListOfBreweries favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite}/>}/>
        <Route path='/profile' element={<Profile favorites={favorites} addFavorite={addFavorite} />} />
        <Route path='/breweries' element={<ListOfBreweries addFavorite={addFavorite} removeFavorite={removeFavorite}/>} />
        <Route path='/favorites' element={<Favorites favorites={favorites} removeFavorite={removeFavorite}/>} />
        <Route path='/details/:id' element={<BreweryDetails addFavorite={addFavorite} removeFavorite={removeFavorite} addStamped={addStamped}/>}/>
        <Route path='/breweries/check-in' element={<CheckIn />} />
        <Route path='/passport' element={<Passport stampedBreweries={stampedBreweries} addStamped={addStamped}/>}/>
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




