import React,{useEffect,useState} from "react";
import Navbar from "./nav-bar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Posts from "./brewery-posts";

const BreweryDetails =({addFavorite}) => {

    const {id} = useParams()
    const [brewery,setBrewery] = useState([])

    const navigate = useNavigate();

    function goBack(){
        navigate('/breweries')
      }

    useEffect(() => {
        axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`)
        .then((res) => {
            setBrewery([res.data])
            console.log(brewery,'brewwery')
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    function handleFavorite(){
        if(brewery.length > 0){
            addFavorite(brewery[0])
        }
    }



    return (
        <div className="details-container">
            <Navbar />
            <h1>Details Page</h1>
            <div className="details-card">
                {brewery.length > 0 ? (
                    <>
                    <p key={brewery[0].id}>{brewery[0].name}</p>
                    <p>Address: {brewery[0].address_1}, {brewery[0].city}</p>
                    <p>
                        Website: {''}
                        {brewery[0].website_url ? ( 
                            <a
                                href={brewery[0].website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {brewery[0].website_url}
                            </a>
                            ) : (
                                'No Website Available'
                            )}
                    </p>
                    <button onClick={handleFavorite}>Favorite</button>
                    <button onClick={() => navigate('/breweries/check-in')}>Check-in</button>
                    <button onClick={goBack}>Go Back</button>
                    </>
                ) : (
                    <p>Loading Details...</p>
                )}
            </div>
            <Posts />
        </div>
    )
}

export default BreweryDetails