import React from 'react';
import {Col,Button} from 'react-bootstrap';

import './EventCard.css';

const EventCard = () => {
    return (
        <Col xs={8} md={3} sm={4} className="person-wrapper">
            <h3>Frank</h3>
            <h4>Hosted By:</h4>
            <p>That's a crooked tree. We'll send him to Washington. These little son of a guns hide in your brush and you just have to push them out.</p>
            <Button> See Details</Button>
        </Col>
    );
};

export default EventCard;