import React, { useState } from "react";
import Posts from "./posts";
import Events from "./events";

const Tabs = () => {
    const [toggle, setToggle] = useState(1);

    function updateToggle(id) {
        setToggle(id);
    }

    return (
        <div className="tabs">
            <ul className="tab-list">
                <li 
                    className={toggle === 1 ? 'active' : ''} 
                    onClick={() => updateToggle(1)}
                >
                    Posts
                </li>
                <li 
                    className={toggle === 2 ? 'active' : ''} 
                    onClick={() => updateToggle(2)}
                >
                    Events
                </li>
            </ul>
            <div className="tab-content">
                <div className={toggle === 1 ? 'show-content' : 'content'}>
                    <h1><Posts /></h1>
                </div>
                <div className={toggle === 2 ? 'show-content' : 'content'}>
                    <h1><Events /></h1>
                </div>
            </div>
        </div>
    );
};

export default Tabs;