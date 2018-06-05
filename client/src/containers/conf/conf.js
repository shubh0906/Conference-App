import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import Aux from '../../hoc/Aux/Aux';
import CustomNavbar from '../../components/Navigation/CustomNavbar/CustomNavbar';
import LoginModal from '../../components/LoginModal/LoginModal';
class conf extends Component {
    state = {
        showModal: false
      };
    closeModalHandler = () => this.setState({ showModal: false });
    showModalHandler = () => this.setState({showModal:true})
    render() {
        return (
                <Aux>
                    <CustomNavbar showModal={this.showModalHandler}/>
                    <Grid>
                        <CustomCarousel/>
                        <LoginModal show={this.state.showModal} onHide={this.closeModalHandler}/>
                    </Grid>
                </Aux>
        );
    }
}



export default conf;