import React, { Component } from 'react';
import { Grid,Jumbotron,Row,Col,Nav,NavItem,Tab,Button } from 'react-bootstrap';

import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios';
import CustomNavbar from '../../components/Navigation/CustomNavbar/CustomNavbar';
import Footer from '../../components/Footer/Footer';
import TabContent from '../../components/TabPane/TabPane';
import './tracks.css';
class Tracks extends Component {
    constructor(props, context) {
        super(props, context);
    
        //this.handleSelect = this.handleSelect.bind(this);
      }
    state={
        isAuthenticated:true,
        tracks:null,
        key:null,
        events:null
    };
    componentDidMount() {
        axios.get('/api/tracks',{headers: {'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjE2ODY0NWE1NmNiODJkNGQzMGJjZmYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI4MjgwMjQwfQ.2tZCxVyB_gh4RuqaLcVpAHb6bjpR1GEkb3gE4sGqb_s'}})
            .then(res =>{
                const tracks = Object.values(res.data["track"]);
                
                this.setState({
                    tracks:tracks,
                    key:tracks[0]["_id"]}
                );
                this.handleSelect(tracks[0]["_id"]);
            }).catch( error => {
                console.log(error);
            });
        console.log("did");
    }
    handleSelect=(Key) => {
        // console.log(Key);
        // console.log(this.state);
        this.setState({key : Key} );
        
        axios.get('/api/tracks/'+Key,{headers: {'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjE2ODY0NWE1NmNiODJkNGQzMGJjZmYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI4MjgwMjQwfQ.2tZCxVyB_gh4RuqaLcVpAHb6bjpR1GEkb3gE4sGqb_s'}})
            .then(res =>{
               
                if(Object.values(res.data)[0]["_id"]!==Key)
                {
                    this.setState({events:res.data});
                }
                    
                else
                {
                    //console.log("set null");
                    this.setState({key : Key,events:null});
                }
                // console.log(this.state);
                // console.log(Object.values(res.data)[0]);
            }).catch( error => {
                console.log(error);
            });
        
    }
    // shouldComponentUpdate(prevState,nextState){
    //     console.log("should");
    //     // console.log("prevState"+JSON.stringify(prevState));
    //     // console.log("nextState"+JSON.stringify(nextState));
    //     return true;
    // }
    // componentDidUpdate(prev,next){
    //     console.log("update"+JSON.stringify(next));
    // }
    render() {
        let navItem = null;
        let tabs = null;
        let tabContainer = null;
        
        if(this.state.tracks!==null){
            navItem=(
                <Nav bsStyle="tabs">
                    {
                        this.state.tracks.map(track =>(
                            <NavItem key={track["_id"]} eventKey={track["_id"]}>{track["name"]} Track</NavItem>
                        ))
                    }
                </Nav>
            );
            tabs =(
                <Tab.Content animation>
                    {
                        this.state.tracks.map(track =>(
                            <TabContent events ={this.state.events} key= {track["_id"]} eventkey={track["_id"]}/>
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
                    <Button onClick={this.handleSelect}>Click Me</Button>
                    {tabContainer}
                </Grid>
                <Footer/>

            </Aux>
        );
    }
}

export default Tracks;
