import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import Select from 'react-select';
import Axios from 'axios';
import { Link } from "react-router-dom";
import PokeCard from './pokecard';

/**
 * class for rendering the Homepage data
 */
export default class HomePage extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                selPoke: null,
                errMsg: '',
                showErrMsg: false,
                srchDisable: true
            }
        }
        /**
         * Method checks for data in localstorage if not found decides which API to be called
         * Use of memoization, hence, requests don't need to be send to the server repeatedly
         */
        componentWillMount() {
            let date = new Date(),
                pokeData = localStorage.getItem(date.toDateString()),
                pokeList = localStorage.getItem('pokeList');

            if (pokeData && pokeList) {
                pokeData = JSON.parse(pokeData);
                pokeList = JSON.parse(pokeList);
                this.setState({
                    pokeList,
                    pokeData
                });
            } else if (pokeList && !pokeData) {
                pokeList = JSON.parse(pokeList);
                this.fetchRndmPokeData(pokeList);
            } else {
                this.getHomeData();
            }

        }
        /**
         * Fetches data from 2 API's to show user Poke list and Random Poke
         * Stores in localstorage so the user doesn't need to fetch the API once fetched
         */
        getHomeData() {
            Axios.all([this.getPokeList(), this.getRndmPokeData()])
                .then(Axios.spread((pokeListData, rndmPokeData) => {
                    if (pokeListData.status === 200 && rndmPokeData.status === 200) {
                        let pokeList = pokeListData.data.results.map((obj) => {
                            return {
                                label: obj.name,
                                value: obj.url
                            }
                        });
                        let date = new Date();
                        localStorage.setItem(date.toDateString(), JSON.stringify(rndmPokeData.data));
                        localStorage.setItem('pokeList', JSON.stringify(pokeList));

                        this.setState({
                            pokeList,
                            pokeData: rndmPokeData.data
                        });
                    } else {
                        this.showError('Something went wrong. Please try again.');
                    }
                })).catch((err) => {
                    this.showError('Something went wrong. Please try again.');
                });
        }
        /**
         * API call for getting poke list
         */
        getPokeList() {
            return Axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964');
        }
        /**
         * API call for getting random poke data
         */
        getRndmPokeData() {
            let rndmPokeNum = Math.floor(Math.random() * Math.floor(807));

            return Axios.get('https://pokeapi.co/api/v2/pokemon/' + rndmPokeNum);
        }

        /**
         * Fetches only Random Poke data and saves pokeList to state from local storage
         * @param {Object} pokeList passed to udpate state
         */
        
        fetchRndmPokeData(pokeList) {
            this.getRndmPokeData().then((rndmPokeData) => {
                if (rndmPokeData.status === 200) {
                    let date = new Date();
                    localStorage.setItem(date.toDateString(), JSON.stringify(rndmPokeData.data));
                    this.setState({
                        pokeData: rndmPokeData.data,
                        pokeList
                    });
                } else {
                    this.showError('Something went wrong. Please try again.');
                }
            }).catch((err) => {
                this.showError('Something went wrong. Please try again.');
            });
        }

        hndlPokeChng = (selPoke) => {
            this.setState({
                selPoke,
                srchDisable: !(selPoke.length > 0)
            });
        }
        /**
         * Error Message display method
         * @param {String} errMsg dynamic variable for error msg display 
         */
        showError(errMsg) {
            this.setState({
                showErrMsg: true,
                errMsg
            });

            setTimeout(() => {
                this.setState({
                    showErrMsg: false
                });
            }, 5000);
        }

        render() {
            return ( 
                <div className = "home-container" >
                    <div className = "home-content" > {
                    this.state.showErrMsg ? < Alert variant = 'danger'
                    onClose = {
                        () => this.setState({
                            showErrMsg: false
                        })
                    }
                    dismissible > { this.state.errMsg } </Alert>:<></ >
                } <div className = "srch-container" >
                <div className = "sel-holder" >
                    <Select placeholder = "Select Pokemon ..."
                    isMulti = { true }
                    value = { this.state.selPoke }
                    onChange = { this.hndlPokeChng }
                    options = { this.state.pokeList ? this.state.pokeList : [] }
                    /> 
                </div> 
                <div className = "srch-btn" >
                <Link to = {
                    {
                        pathname: '/srchpg',
                        state: {
                            selPoke: this.state.selPoke
                        }
                    }
                } >
                    <Button variant = "danger"
                    disabled = { this.state.srchDisable } >
                    Search </Button> 
                </Link> 
                </div> 
                </div> {
                    this.state.pokeData ?<>
                        <div className = "home-poke-quest" >
                            Today 's Poke Guide 
                        </div> <PokeCard {...this.state.pokeData }
                    /> </>: < > </>} 
                </div> 
            </div>
        );
    }
}