import React, { Component } from 'react'
import { Navbar, Nav, NavItem,Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


import './CustomNavbar.css';

const CustomNavbar = (props) => {
  return (
    <Navbar default collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <NavLink to="/">Conference 2018</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <Navbar.Form pullLeft>
          <Button
              bsStyle="primary"
              onClick={props.showModal}
            >Login
          </Button>
        </Navbar.Form>
        <NavItem eventKey={1} componentClass={NavLink} href="/" to="/">
          Home
        </NavItem>
        <NavItem eventKey={2} bsStyle="primary" componentClass={NavLink} href="/admin" to="/admin">
          Admin
        </NavItem>
      </Nav>
    </Navbar.Collapse>
    
  </Navbar>
  );
};
export default CustomNavbar;