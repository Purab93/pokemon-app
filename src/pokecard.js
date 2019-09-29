import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default class PokeCard extends React.Component {

    getPokeDetails(){
        let pokeData = this.props;
        return {
            name: pokeData.name,
            imgData: this.getPokeImgs(pokeData.sprites),
            type: this.getPokeType(pokeData.types),
            hp: pokeData.base_experience
        }
    }


    getPokeType(pokeType) {
        let typeData = pokeType.map((val) => {
            return val.type.name;
        });
        return typeData.join(', ');
    }

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
        return (<Slider {...sliderConfig } >
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

    render(){
        let pokeData = this.getPokeDetails();
        return (
            <div className="poke-card-container">
                <div className="poke-card-header">
                    <div className="poke-name">{pokeData.name}</div>
                    <div className="poke-hp">
                        <div>{pokeData.hp+'HP'}</div>
                    </div>
                    <div className="poke-type-data">{pokeData.type + ' Pokemon'}</div>
                </div>
                <div className="poke-img-slider">
                    {pokeData.imgData}
                </div>
                <div className="link-holder">
                    <Link to={{
                        pathname: `/pokemon/${pokeData.name}`,
                        state: {...this.props}
                    }}>
                        View Details
                    </Link>
                </div>
            </div>
        );
    }
}