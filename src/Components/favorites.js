import React from "react";
import Navbar from "./nav-bar";


const Favorites = ({favorites, removeFavorite}) => {


    function removeNewFavorite(brewery){
        console.log('remove favorite')
        removeFavorite(brewery)
    }

    return (
        <div className="favorites-card">
            <Navbar />
            <h2>Favorites</h2>
            <div>
                {favorites.map((brewery) => (
                    <div className="favorites-list">
                    <p key={brewery.id}>{brewery.name}</p>
                    <p>Address: {brewery.address_1}, {brewery.city}</p>
                    <p>
                        Website: {''}
                        {brewery.website_url ? ( 
                            <a
                                href={brewery.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {brewery.website_url}
                            </a>
                            ) : (
                                'No Website Available'
                            )}
                    </p>
                   <button onClick={() => removeFavorite(brewery)}>Remove Favorite</button>
                </div> 
                ))}
            </div>
        </div>
    )
}

export default Favorites