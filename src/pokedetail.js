import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class PokeDetail extends React.Component {
    constructor(props){
        super(props);
        this.state={...props.location.state}
    }

    getPokeDetails(){
        let pokeData = this.state;debugger
        return {
            name: pokeData.name,
            imgData: this.getPokeImgs(pokeData.sprites),
            type: this.getPokeType(pokeData.types),
            hp: pokeData.base_experience,
            weight: pokeData.weight,
            height: pokeData.height
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
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            className: 'poke-sldr',
            autoplay: true,
            autoplaySpeed: 1000,
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
            <div className="poke-details-container">
                <div className="poke-detail-header">
                    <div className="poke-name">{pokeData.name}</div>
                    <div className="poke-hp">
                        <div>{pokeData.hp+'HP'}</div>
                    </div>
                    <div className="poke-type">{pokeData.type + ' Pokemon'}</div>
                </div>
                <div className="poke-detail-body row">
                    <div className="poke-img-slider col-12 col-md-4">
                        {pokeData.imgData}
                    </div>

                    <div className="poke-detail col-12 col-md-8">

                    </div>
                </div>
            </div>
        );
    }
}