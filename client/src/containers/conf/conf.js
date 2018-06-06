import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Grid } from 'react-bootstrap';

import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios';
import CustomNavbar from '../../components/Navigation/CustomNavbar/CustomNavbar';
import LoginModal from '../../components/LoginModal/LoginModal';
class Conf extends Component {
    state = {
        showModal: false,
        isAuthenticated:false,
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
        },
        userType:null
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
        axios.post('/users/login',authData)
            .then(res => {
                console.log(res);
                localStorage.setItem('token',res.headers["x-auth"]);
                localStorage.setItem("userId",res.data["_id"]);
                //this.setState({ showModal: false });
                this.setState({ isAuthenticated: true });

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
    
    showModalHandler = (event) => {
        console.log(event);
        this.setState({
            showModal:true,
            userType:event})
    }
    render() {
        if(this.state.isAuthenticated)
        {
            console.log(this.state);
            return <Redirect to="/tracks"/>;
        }
        let loginModal=null;
        
        if(this.state.userType!=null && this.state.showModal){
            console.log("hello");
            loginModal=(<LoginModal 
                userType={this.state.userType}
                onClick={this.loginHandler} 
                input={this.state.input} 
                inputHandler={this.inputChangeHandler} 
                show={this.state.showModal} 
                onHide={this.closeModalHandler}/>);
        }
        console.log("loginModal=>"+loginModal);
        console.log("userType=>"+this.state.userType);
        return (
                <Aux>
                    <CustomNavbar isAuthenticated={this.state.isAuthenticated} showModal={this.showModalHandler}/>
                    <Grid>
                        <CustomCarousel/>
                        {loginModal}
                    </Grid>
                    
                </Aux>
        );
    }
}



export default Conf;