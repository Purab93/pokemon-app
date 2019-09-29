import React from 'react';
import Axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Accordion, Card } from 'react-bootstrap';
import Loader from './loader';

/**
 * class for Pokemon Details and Features
 */
export default class PokeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props.location.state,...{showLoader: true}}
    }

    componentDidMount() {
        let pokeData = this.getPokeDetails();
        this.getSpeciesData(pokeData, this.state.species);
    }

    /**
     * Simplifies and returns Poke details
     */

    getPokeDetails() {
        let pokeData = this.state;
        return {
            name: pokeData.name,
            imgData: this.getPokeImgs(pokeData.sprites),
            type: this.getPokeType(pokeData.types),
            hp: pokeData.base_experience,
            weight: pokeData.weight,
            height: pokeData.height,
            stats: this.getPokeStats(pokeData.stats),
            moves: this.getPokeMoves(pokeData.moves)
        }
    }
    /**
     * Fetches additional data for the pokemon species using species API
     * @param {Object} pokeData use for later merging the species data and updating state
     * @param {Object} speciesData base species data passed for API call
     */
    getSpeciesData(pokeData, speciesData) {
        Axios(speciesData.url)
            .then((res) => {
                let speciesData = res.data;
                let natureTxt = '';

                speciesData.flavor_text_entries.filter((obj, index) => {
                    if (obj.language.name === 'en') {
                        natureTxt += ' ' + obj.flavor_text;
                    }
                })
                let addData = {
                    baseHapp: speciesData.base_happiness,
                    color: speciesData.color && speciesData.color.name?speciesData.color.name:null,
                    captureRate: speciesData.capture_rate,
                    evolvesFrom: speciesData.evolves_from_species && speciesData.evolves_from_species.name ?speciesData.evolves_from_species.name:null,
                    natureTxt: natureTxt,
                    growthRate: speciesData.growth_rate && speciesData.growth_rate.name?speciesData.growth_rate.name:null,
                    habitat: speciesData.habitat && speciesData.habitat.name?speciesData.habitat.name:null
                };
                let finalData = { ...pokeData, ...addData };
                this.setState({
                    finalData,
                    showLoader: false
                })
            }).catch((err) => {
                console.log('Something went wrong');
            });
    }
    /**
     * Returns pokemon moves DOM
     * @param {Array} pokeMoves 
     */
    getPokeMoves(pokeMoves) {
        return (
            <>
                {pokeMoves.map((obj) => {
                    return (
                        <div className="poke-move" key={obj.move.name}>
                            {obj.move.name}
                        </div>
                    )
                })}
            </>
        )
    }
    /**
     * Return pokemon Statistics DOM
     * @param {Array} stats 
     */
    getPokeStats(stats) {
        return (<>
            {stats.map((obj) => {
                return (
                    <div className="poke-stat" key={obj.stat.name}>
                        {obj.stat.name}
                        <br />
                        <span className="stat-pow">{obj.base_stat}</span>
                    </div>
                )
            })}
        </>);
    }
    /**
     * Returns Pokemon Type String
     * @param {Array} pokeType 
     */
    getPokeType(pokeType) {
        let typeData = pokeType.map((val) => {
            return val.type.name;
        });
        return typeData.join(', ');
    }
    /**
     * Returns Image Slider for Pokemon Data
     * @param {Object} imgData 
     */
    getPokeImgs(imgData) {
        let sliderConfig = {
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            className: 'poke-sldr',
            autoplay: true,
            autoplaySpeed: 2000,
            lazyLoad: 'progressive'
        };
        return (<Slider {...sliderConfig} >
            {
                Object.keys(imgData).reverse().map((key, index) => {
                    if (imgData[key]) {
                        return (<img key={'poke-img-' + index} className="poke-img" src={imgData[key]} alt="poke-img" />);
                    }
                })
            }
        </Slider >
        );
    }

    render() {
        let pokeData = this.state && this.state.finalData ? this.state.finalData : {};
        return (
            this.state.showLoader?<Loader />:
            <div className="poke-details-container">
                <div className="poke-detail-header">
                    <div className="poke-name">{pokeData.name}</div>
                    <div className="poke-hp">
                        <div>{pokeData.hp + 'HP'}</div>
                    </div>
                    <div className="poke-type-data">
                        <span className="poke-typ">{pokeData.type + ' Pokemon, '}</span>
                        {pokeData.evolvesFrom?<span className="evol-data">{'Evolves from '+ pokeData.evolvesFrom + ', '}</span>:<></>}
                        <span className="ht-wt-data">{'Height: ' + pokeData.height + 'in Weight:'+ pokeData.weight + 'lbs'}</span>
                    </div>
                </div>
                <div className="poke-detail-body row">
                    <div className="poke-img-slider col-12 col-md-4">
                        {pokeData.imgData}
                    </div>

                    <div className="poke-details col-12 col-md-8">
                        <div className="poke-stats-holder">
                            {pokeData.stats}
                        </div>
                    </div>
                    <div className="poke-moves-holder col-12">
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    <span className="accor-header-text">Summary</span>
                                    <span className="accor-header-icon">+</span>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div className="species-desc">
                                            {pokeData.natureTxt}
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    <span className="accor-header-text">Attacks</span>
                                    <span className="accor-header-icon">+</span>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        {pokeData.moves}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="2">
                                    <span className="accor-header-text">Additional Info</span>
                                    <span className="accor-header-icon">+</span>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        <div className="add-info">
                                        <div className="poke-stat">
                                            Base Happiness
                                        <br />
                                            <span className="stat-pow">{pokeData.baseHapp}</span>
                                        </div>
                                        {pokeData.captureRate?<div className="poke-stat">
                                            Capture Rate
                                        <br />
                                            <span className="stat-pow">{pokeData.captureRate}</span>
                                        </div>:<></>}
                                        {pokeData.growthRate?
                                        <div className="poke-stat">
                                            Growth Rate
                                        <br />
                                            <span className="stat-pow">{pokeData.growthRate}</span>
                                        </div>:<></>}
                                        
                                        {pokeData.habitat?
                                        <div className="poke-stat">
                                            Habitat
                                        <br />
                                            <span className="stat-pow">{pokeData.habitat}</span>
                                        </div>:<></>}
                                        {pokeData.color?
                                        <div className="poke-stat">
                                            Color
                                        <br />
                                            <span className="stat-pow">{pokeData.color}</span>
                                        </div>:<></>}
                                    </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>

                    </div>
                </div>
            </div>
        );
    }
}