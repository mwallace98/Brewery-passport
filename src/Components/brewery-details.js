import React,{useEffect,useState} from "react";
import Navbar from "./nav-bar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomMap from "./map";

const BreweryDetails =({addStamped}) => {

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
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

   
  


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
                    <button onClick={() => console.log('check in')}>Check-in</button>
                    <button onClick={goBack}>Go Back</button>
                    <button onClick={() => addStamped(brewery[0])}>Stamp Passport</button>
                    </>
                ) : (
                    <p>Loading Details...</p>
                )}
            
                {brewery.length > 0 && brewery[0].latitude && brewery[0].longitude ? (
                    <CustomMap 
                    center={{
                        lat:parseFloat(brewery[0].latitude),
                        lng:parseFloat(brewery[0].longitude)
                    }}
                    /> ) : (
                        <p>Map Data Not Available</p>
                    )} 
            </div>
        </div>
    )
}

export default BreweryDetails