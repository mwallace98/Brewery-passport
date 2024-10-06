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
                    <p>Name: {stampedBreweries[0].name}</p>
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