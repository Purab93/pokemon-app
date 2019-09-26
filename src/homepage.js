import React from 'react';
import {Alert, Form,InputGroup,  FormControl, Button} from 'react-bootstrap';
import PokeCard from './pokecard';
import Axios from 'axios';

export default class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            pokeName: '',
            errMsg: '',
            showErrMsg: false
        }
    }

    storeSrchTxt = (event) => {
        let pokeName = event.currentTarget.value;
        this.setState({
            pokeName
        });
    }

    handleKeyDwn = (e) =>{
        e.nativeEvent.stopImmediatePropagation();
        if (e.key === 'Enter') {
            this.getPokeData();
        }
    }

    getPokeData = () =>{
        Axios('https://pokeapi.co/api/v2/pokemon/'+this.state.pokeName).then((res)=>{
            debugger;
            if(res.status === 200){
                this.setState({
                    pokeData: res.data
                });
            } else {
                this.showError('Something went wrong. Please try again.');
            }
        }).catch((err)=>{
            this.showError('Something went wrong. Please try again.');
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
                    {/* <Form inline action="#"> 
                        <FormControl type="text" placeholder="Search" className="srch-bar col-6"/>
                        <Button variant="outline-success" className="srch-btn col-2" >Search</Button>
                    </Form> */}

                    <InputGroup className="poke-srch-box">
                        <FormControl
                            placeholder="Enter Pokemon Name"
                            onChange={this.storeSrchTxt} 
                            onKeyDown={this.handleKeyDwn}
                        />
                        <InputGroup.Append>
                        <Button variant="outline-success" onClick={this.getPokeData}>Button</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {this.state.pokeData?<PokeCard {...this.state.pokeData} />:<></>}
                </div>
            </div>
        );
    }
}
