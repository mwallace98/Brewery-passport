import React,{useState,useEffect} from "react";
import axios from "axios";
import Navbar from "./nav-bar";
import { Navigate, useNavigate } from "react-router-dom";


const Breweries = ({removeFavorite,addFavorite,favorites}) => {
    const URL = 'https://api.openbrewerydb.org/v1/breweries';
    const [breweries,setBreweries] = useState([])
    const [search,setSearch] = useState('')
    const [randomBrewery,setRandomBrewery] = useState(null);
    const [page,setPage] = useState(1);
    
   

    const navigate = useNavigate();
  
    useEffect(() =>{
      fetchBreweries(page)
    },[page])

    const fetchBreweries = (pageNumber) => {
      axios.get(`${URL}?by_state=massachusetts&page=${pageNumber}&per_page=15`)
      .then((res) => {
        setBreweries(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    } 



    const fetchRandomBrewery = () => {
      const timestamp = new Date().getTime();
      axios.get(`https://api.openbrewerydb.org/v1/breweries/random?cachebuster=${timestamp}`)
      .then(res => {
          setRandomBrewery(res.data[0])
      })
      .catch((err) => {
          console.log(err)
      })
    }

    

    function handleSearch(e){
      setSearch(e.target.value)
    }

    function newFavorite(brewery){
      if(brewery){
        addFavorite(brewery)
      }
  }

  

    const filteredArray = breweries.filter((brewery) => 
      brewery.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
      <div className="brewery-list-container" >
        <Navbar />
        
        <div className="button-group"></div>
          <button onClick={fetchRandomBrewery} style={{ marginBottom: "20px" }}>
              Get Random Brewery
          </button>
          <input 
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch} 
          >
          </input>
          {randomBrewery && (
              
          <div className="brewery-list" style={{ backgroundColor: "#ffebcd" }}>
            <h3>Random Brewery</h3>
            <p>{randomBrewery.name}</p>
            <p>
              Address: {randomBrewery.street}, {randomBrewery.city}, {randomBrewery.state}
            </p>
            <p>
              Website:{" "}
              {randomBrewery.website_url ? (
                <a
                  href={randomBrewery.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {randomBrewery.website_url}
                </a>
              ) : (
                "No Website Available"
              )}
            </p>
            <button onClick={() => navigate(`/details/${randomBrewery.id}`)}>Details</button>
          </div>
        )}
          {filteredArray.map((breweries) => {
              return (
                  <div className="brewery-list">
                      <p key={breweries.id}>{breweries.name}</p>
                      <p>Address: {breweries.address_1}, {breweries.city}</p>
                      <p>
                          Website: {''}
                          {breweries.website_url ? ( 
                              <a
                                  href={breweries.website_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                              >
                                  {breweries.website_url}
                              </a>
                              ) : (
                                  'No Website Available'
                              )}
                      </p>
                      <button onClick={() => navigate(`/details/${breweries.id}`)}>Details</button>
                      <button onClick={() => newFavorite(breweries)}>Add Favorite</button>
                      <button onClick={() => removeFavorite(breweries)}>Remove Favorite</button>
                  </div> 
              )
          })}
      <div className=" page-controls">
        <button 
        onClick={() => setPage((prev) => Math.max(prev - 1,1))}
        disabled={page===1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>
              Next
          </button>
      </div>

      </div>
    )
  }

export default Breweries

