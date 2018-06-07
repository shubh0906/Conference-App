import React from 'react';
import {Tab,Col,Image,Row,Button}from 'react-bootstrap';

import EventCard from '../EventCard/EventCard';
import Aux from '../../hoc/Aux/Aux';
import './TabPane.css';

const TabPane = (props) => {
    
    let eventCard =null;
    //console.log("111111111111"+JSON.stringify(props));
    if(props.events!==null){
        //console.log("22222222222222222"+JSON.stringify(props));
        eventCard=(
            <Aux>
                {
                    props.events.map( event =>(
                        <EventCard key={event["_id"]} title={event["title"]}/>
                    ))
                }
            </Aux>
            
        );
    }
    return (
        <Tab.Pane eventKey={props.eventkey}>
            <Row className="show-grid text-center">
                {eventCard}
            </Row>
        </Tab.Pane>
    );
};

export default TabPane;