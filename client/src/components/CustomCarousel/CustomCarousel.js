import React from 'react';
import { Carousel } from 'react-bootstrap';

import CarouselItem from './CarouselItem/CarouselItem';
import './CustomCarousel.css';

const CustomCarousel = () => {
    return (
        <Carousel>
            <CarouselItem 
                alt="900x500" 
                src="assets/event-1.jpg"
                label="First slide label"
                description="Nulla vitae elit libero, a pharetra augue mollis interdum."/>
            <CarouselItem 
                alt="900x500" 
                src="assets/event-2.jpg"
                label="Second slide label"
                description="Nulla vitae elit libero, a pharetra augue mollis interdum." />
            <CarouselItem 
                alt="900x500" 
                src="assets/event-3.jpg"
                label="Third slide label"
                description="Nulla vitae elit libero, a pharetra augue mollis interdum." />
            <CarouselItem 
                alt="900x500" 
                src="assets/event-2.jpg"
                label="Fourth slide label"
                description="Nulla vitae elit libero, a pharetra augue mollis interdum." />
        </Carousel>
    );
};

export default CustomCarousel;