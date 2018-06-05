import React from 'react';
import { Modal,Button,FormGroup,Form,FormControl,Col,ControlLabel, } from 'react-bootstrap';

import './LoginModal.css';

const LoginModal = (props) => {
    let formGroup =null; 
    if (props.show){
    //console.log("in modal"+ JSON.stringify(props));
    const formElementsArray = [];
    for (let key in props.input) {
        //console.log(key);
        formElementsArray.push({
            id: key,
            prop: props.input[key]
        });
    }
    //console.log(formElementsArray);
    formGroup = (
      <Form horizontal>
        {formElementsArray.map(formElement => (
            <CustomFormGroup 
                key={formElement.id}
                {...formElement.prop}
                inputHandler={props.inputHandler}
                />
            ))}
      </Form>
    );
    }
    return (
        <Modal show={props.show} onHide={props.onHide} >
          <Modal.Header closeButton>
            <Modal.Title>User Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {formGroup}
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={props.login}>Login</Button>
            <Button bsStyle="danger" onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
};

const CustomFormGroup = (props) => {
  //console.log(props);
  return(
    <FormGroup controlId={props.controlId}>
      <Col componentClass={ControlLabel} sm={2}>
        {props.placeholder}
      </Col>
      <Col sm={10}>
        <FormControl onChange={props.inputHandler} type={props.type} placeholder={props.placeholder} />
      </Col>
    </FormGroup>
  );
};

export default LoginModal;