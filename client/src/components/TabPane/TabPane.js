import React from 'react';
import {Tab,Col,Image,Row}from 'react-bootstrap';

import EventCard from '../EventCard/EventCard';
import './TabPane.css';

const TabPane = (props) => {
    //console.log("111111111111"+JSON.stringify(props.eventkey))   ;
    return (
        <Tab.Pane eventKey={props.eventkey}>
            <Row className="show-grid text-center">
                <EventCard/>
                <EventCard/>
                <EventCard/>
            </Row>
        </Tab.Pane>
    );
};

export default TabPane;