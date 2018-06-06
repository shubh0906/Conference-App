import React from 'react'
import { Navbar, Nav, NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


import './CustomNavbar.css';

const CustomNavbar = (props) => {
  console.log(JSON.stringify(props));
  let navLogin =null;
  if(!props.isAuthenticated){
    navLogin=(<NavDropdown eventKey={2} title="Login" id="basic-nav-dropdown">
                <MenuItem eventKey={"User"} onSelect={props.showModal}>User</MenuItem>
                <MenuItem eventKey={"Admin"}onSelect={props.showModal}>Admin</MenuItem>
              </NavDropdown>);
  }
  else{
    navLogin=( <NavItem eventKey={1} componentClass={NavLink} href="/" to="/">
                Logout
              </NavItem>);
  }
  return (
    <Navbar default collapseOnSelect fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink to="/">Conference 2018</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} componentClass={NavLink} href="/" to="/">
            Home
          </NavItem>
          {navLogin}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default CustomNavbar;