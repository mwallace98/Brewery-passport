import React from "react";
import Navbar from "./nav-bar";
import Tabs from "./react-tabs";

const Passport = ({stampedBreweries}) => {
    return (
        <div className="passport-container">
            <Navbar />
            <h1>Passport</h1>
            <div className="stamped-breweries-card"> {stampedBreweries.length > 0 ? (
                    <>
                    <p>{stampedBreweries.map((stamped) => {
                        return (
                            <div className="stamped-breweries-list">
                                <p key={stamped.id}>{stamped.name}</p>
                                <p>Address: {stamped.address_1}, {stamped.city}</p>
                                <p>
                                    Website: {''}
                                        {stamped.website_url ? ( 
                                <a
                                    href={stamped.website_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {stamped.website_url}
                                </a>
                                ) : (
                                    'No Website Available'
                                )}
                        </p>
                      </div>
                        )
                    })}</p>
                    </>
                ) : (
                    <p>No Breweries Stamped</p>
                )}
            </div>
            <Tabs />
            
        </div>
    )
}

export default Passport