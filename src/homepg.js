import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import Select from 'react-select';
import Axios from 'axios';
import { Link } from "react-router-dom";

import PokeCard from './pokecard';

export default class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selPoke: null,
            errMsg: '',
            showErrMsg: false,
            srchDisable: true
        }
    }

    componentWillMount(){
        let date = new Date(),
            pokeData = localStorage.getItem(date.toDateString()),
            pokeList = localStorage.getItem('pokeList');

        //use of memoization hence requests don't need to be send to server repeatedly
        if(pokeData && pokeList){
            pokeData = JSON.parse(pokeData);
            pokeList = JSON.parse(pokeList);
            this.setState({
                pokeList,
                pokeData
            });
        }else if(pokeList && !pokeData){
            pokeList = JSON.parse(pokeList);
            this.fetchRndmPokeData(pokeList);
        }else {
            this.getHomeData();
        }

    }

    fetchRndmPokeData(pokeList){
        this.getRndmPokeData().then((rndmPokeData)=>{
            if(rndmPokeData.status === 200){
                let date = new Date();
                localStorage.setItem(date.toDateString(),JSON.stringify(rndmPokeData.data));
                this.setState({
                    pokeData: rndmPokeData.data,
                    pokeList
                });
            } else {
                this.showError('Something went wrong. Please try again.');
            }
        }).catch((err)=>{
            this.showError('Something went wrong. Please try again.');
        });
    }
    
    getHomeData(){
        Axios.all([this.getPokeList(),this.getRndmPokeData()])
        .then(Axios.spread((pokeListData,rndmPokeData)=>{
            if(pokeListData.status === 200 && rndmPokeData.status === 200){
                let pokeList=pokeListData.data.results.map((obj)=>{
                    return {
                        label:obj.name,
                        value:obj.url
                    }
                });
                let date = new Date();
                localStorage.setItem(date.toDateString(),JSON.stringify(rndmPokeData.data));
                localStorage.setItem('pokeList',JSON.stringify(pokeList));

                this.setState({
                    pokeList,
                    pokeData: rndmPokeData.data
                });
            } else {
                this.showError('Something went wrong. Please try again.');
            }
        })).catch((err)=>{
            this.showError('Something went wrong. Please try again.');
        });
    }

    getPokeList(){
        return Axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964');
    }

    getRndmPokeData(){
        let rndmPokeNum = Math.floor(Math.random() * Math.floor(807));

        return Axios.get('https://pokeapi.co/api/v2/pokemon/'+rndmPokeNum);
    }

    hndlPokeChng = (selPoke) => {
        this.setState({
            selPoke,
            srchDisable: !(selPoke.length > 0)
        });
    }

    showError(errMsg){
        this.setState({
            showErrMsg: true,
            errMsg
        });

        setTimeout(()=>{
            this.setState({
                showErrMsg: false
            });
        },5000);
    }

    render(){
        return (
            <div className="home-container">
                <div className="home-content">
                    {this.state.showErrMsg?<Alert variant='danger' onClose={() =>  this.setState({
                    showErrMsg: false
                    })} dismissible>
                        {this.state.errMsg}
                    </Alert>:<></>}
                    <div className="srch-container">
                        <div className="sel-holder">
                            <Select
                                isMulti={true}
                                value={this.state.selPoke}
                                onChange={this.hndlPokeChng}
                                options={this.state.pokeList?this.state.pokeList:[]}
                            />
                        </div>
                        <div className="srch-btn">
                            <Link to={{
                                pathname: '/srchpg',
                                state: {
                                    selPoke:this.state.selPoke
                                }
                            }}>
                                <Button variant="danger" disabled={this.state.srchDisable}>
                                    Search
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {this.state.pokeData?<PokeCard {...this.state.pokeData} />:<></>}
                </div>
            </div>
        );
    }
}
