import React, { Component } from 'react';
import { Grid,Jumbotron,Row,Col,Nav,NavItem,Tab } from 'react-bootstrap';

import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios';
import CustomNavbar from '../../components/Navigation/CustomNavbar/CustomNavbar';
import Footer from '../../components/Footer/Footer';
import TabContent from '../../components/TabPane/TabPane';
import './tracks.css';
class Tracks extends Component {
    state={
        isAuthenticated:true,
        tracks:null,
        key:null
    };
    componentDidMount() {
        axios.get('/api/tracks',{headers: {'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjE2ODY0NWE1NmNiODJkNGQzMGJjZmYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI4MjgwMjQwfQ.2tZCxVyB_gh4RuqaLcVpAHb6bjpR1GEkb3gE4sGqb_s'}})
            .then(res =>{
                const tracks = Object.values(res.data["track"]);
                this.setState({
                    tracks:tracks,
                    key:tracks[0]["name"]}
                );
            }).catch( error => {
                console.log(error);
            });

    }
    handleSelect(key) {
        console.log(key);
        this.setState({key : key} );
        
    }
    render() {
        let navItem = null;
        let tabs = null;
        let tabContainer = null;
        if(this.state.tracks!==null){
            navItem=(
                <Nav bsStyle="tabs">
                    {
                        this.state.tracks.map(track =>(
                            <NavItem key={track["name"]} eventKey={track["name"]}>{track["name"]} Track</NavItem>
                        ))
                    }
                </Nav>
            );
            tabs =(
                <Tab.Content animation>
                    {
                        this.state.tracks.map(track =>(
                            <TabContent key= {track["name"]} eventkey={track["name"]}/>
                        ))
                    }
                 </Tab.Content>
            );
            tabContainer = (
                <Tab.Container  
                        onSelect={this.handleSelect} 
                        id="tab-cont" 
                        defaultActiveKey={this.state.key}>
                        <Row className="clearfix">
                            <Col sm={12}>
                                {navItem}
                            </Col>
                            <Col sm={12}>
                                {tabs}
                            </Col>
                        </Row>
                    </Tab.Container>
            );
        }
        
            
        return (
            <Aux>
                <CustomNavbar isAuthenticated={this.state.isAuthenticated}/>
                
                <Grid>
                    <Jumbotron>
                        <h1>Tracks</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                    </Jumbotron>
                    {tabContainer}
                </Grid>
                <Footer/>

            </Aux>
        );
    }
}

export default Tracks;
