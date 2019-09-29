import React from 'react';
import Axios from 'axios';
import PokeCard from './pokecard';
import Loader from './loader';

/**
 * class for Search Page Handling
 */
export default class SrchPg extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allPokeData: [],
            showLoader: true
        }
    }
    /**
     * Fetches all selected pokemon data by creating dynamic calls for each API
     */
    componentWillMount(){
        let allPokeData = this.props.location.state.selPoke;

        Axios.all(allPokeData.map(obj => Axios.get(obj.value)))
        .then(Axios.spread((...res) => {
            this.setState({
                allPokeData:res,
                showLoader: false
            });  
        })).catch((err)=>{
            console.log('Something went wrong. Please try again.');
        });
    }
    /**
     * Based on the API outputs above returns Poke Card of each poke
     */
    getAllPokeDtls(){
        return this.state.allPokeData.map((result)=>{
            return (
                <div key={result.data.name} className="srch-poke-card">
                    <PokeCard {...result.data} />
                </div>
            );
        });
    }

    render(){
        return (
            this.state.showLoader?<Loader /> :
            <div className="srch-rslt-container container">
                {this.state.allPokeData.length?this.getAllPokeDtls():<></>}
            </div>
        );
    }
}