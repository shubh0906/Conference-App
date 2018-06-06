import React from 'react';
import { Carousel,Image } from 'react-bootstrap';

const CarouselItem = (props) => {
    return (
        <Carousel.Item {...props}>
            <Image  alt={props.alt} src={props.src}/>
            <Carousel.Caption>
                <h3>{props.label}</h3>
                <p>{props.description}</p>
            </Carousel.Caption>
        </Carousel.Item>
    );
};

export default CarouselItem;