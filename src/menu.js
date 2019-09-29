import React from 'react';

export default class Menu extends React.Component {
    render(){
        return (
            <div className="menu-container">
                <div className="logo-holder">
                  <img src={process.env.PUBLIC_URL + '/logo.png'} alt="pokemon-logo" />
                </div>
                <div className="pokeball-logo pokeball-logo-left">
                    <img src={process.env.PUBLIC_URL + '/pokeball_trans.png'} alt="pokeball-logo" />
                </div>
                <div className="pokeball-logo pokeball-logo-right">
                    <img src={process.env.PUBLIC_URL + '/pokeball_trans.png'} alt="pokeball-logo" />
                </div>
            </div>
        );
    }
}