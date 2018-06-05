import React from 'react';
import { Modal,Button,FormGroup,Form,FormControl,Col,ControlLabel, } from 'react-bootstrap';

import './LoginModal.css';

const LoginModal = (props) => {
    console.log("in modal"+ JSON.stringify(props));
    return (
        <Modal {...props}>
          <Modal.Header closeButton>
            <Modal.Title>User Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder="Email" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </FormGroup>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={props.login}>Login</Button>
            <Button bsStyle="danger" onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
};

export default LoginModal;