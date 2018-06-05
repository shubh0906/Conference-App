import React from 'react';
import { Carousel } from 'react-bootstrap';

import CarouselItem from './CarouselItem/CarouselItem';
import './CustomCarousel.css';

const CustomCarousel = () => {
    return (
        <Carousel>
            <CarouselItem 
                alt="900x500" 
                src="/carousel.png"
                label="First slide label"
                description="Nulla vitae elit libero, a pharetra augue mollis interdum."/>
            <CarouselItem 
                alt="900x500" 
                src="/carousel.png"
                label="Second slide label"
                description="Nulla vitae elit libero, a pharetra augue mollis interdum." />
            <CarouselItem 
                alt="900x500" 
                src="/carousel.png"
                label="Third slide label"
                description="Nulla vitae elit libero, a pharetra augue mollis interdum." />
            <CarouselItem 
                alt="900x500" 
                src="/carousel.png"
                label="Fourth slide label"
                description="Nulla vitae elit libero, a pharetra augue mollis interdum." />
        </Carousel>
    );
};

export default CustomCarousel;