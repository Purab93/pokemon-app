import React from 'react';
import { Link } from "react-router-dom";
/**
 * Menu class for logos and options
 */
export default class Menu extends React.Component {
    render(){
        return (
            <div className="menu-container">
                <Link to={{
                        pathname: '/'
                }}>
                    <div className="logo-holder">
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="pokemon-logo" />
                    </div>
                </Link>
                <Link to={{
                        pathname: '/'
                }}>
                    <div className="pokeball-logo pokeball-logo-left">
                        <img src={process.env.PUBLIC_URL + '/pokeball_trans.png'} alt="pokeball-logo" />
                    </div>
                </Link>
                <Link to={{
                        pathname: '/'
                }}>
                    <div className="pokeball-logo pokeball-logo-right">
                        <img src={process.env.PUBLIC_URL + '/pokeball_trans.png'} alt="pokeball-logo" />
                    </div>
                </Link>
            </div>
        );
    }
}