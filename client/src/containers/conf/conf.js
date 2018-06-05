import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios';
import CustomNavbar from '../../components/Navigation/CustomNavbar/CustomNavbar';
import LoginModal from '../../components/LoginModal/LoginModal';
class conf extends Component {
    state = {
        showModal: false,
        input : {
            email:{
                value:'',
                placeholder:'Email',
                type:'email',
                controlId:'email'
            },
            password:{
                value:'',
                placeholder:'Password',
                type:'password',
                controlId:'password'
            }
        }
    };
    updateObject = (oldObject, updatedProperties) => {
        return {
            ...oldObject,
            ...updatedProperties
        };
    };
    loginHandler = () => {
        console.log("login request");
        const authData ={
            email:this.state.input.email.value,
            password:this.state.input.password.value,
            accountType:"user"
        }
        axios.post('users/login',authData)
            .then(res => {
                console.log(res.headers);
            }).catch(error => {
                console.log(error);
            })
    }
    inputChangeHandler = (event)=>{
        // console.log(event.target.id)
        // console.log(event.target.value)
        const updatedTarget=this.updateObject(this.state.input[event.target.id],{
        value:event.target.value});
        const updateInput = this.updateObject(this.state.input,{
            [event.target.id]:updatedTarget
        });
        this.setState({input:updateInput});
        // console.log(this.state.input.email.value)
        // console.log(this.state.input.password.value)
    }
    closeModalHandler = () => this.setState({ showModal: false });
    showModalHandler = () => this.setState({showModal:true})
    render() {
        return (
                <Aux>
                    <CustomNavbar showModal={this.showModalHandler}/>
                    <Grid>
                        <CustomCarousel/>
                        <LoginModal onClick={this.loginHandler} input={this.state.input} inputHandler={this.inputChangeHandler} show={this.state.showModal} onHide={this.closeModalHandler}/>
                    </Grid>
                </Aux>
        );
    }
}



export default conf;