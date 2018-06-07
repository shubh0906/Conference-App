import React from 'react';
import { Jumbotron,Row,Col } from 'react-bootstrap';

import './Footer.css';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
    return (
        <Jumbotron>
            <Row>
                <Col xs={12} sm={4} className="align-self-center">
                    <h5>Our Address</h5>
                    <address>
                        121, Clear Water Bay Road<br/>
                        Clear Water Bay, Kowloon<br/>
                        HONG KONG<br/>
                        <i className="fa fa-phone fa-lg"></i>: +852 1234 5678<br/>
                        <i className="fa fa-fax fa-lg"></i>: +852 8765 4321<br/>
                        <i className="fa fa-envelope fa-lg"></i>:
                        <a className="color-floralwhite" href="mailto:confusion@food.net">confusion@food.net</a>
                    </address>
                </Col>
                <Col xs={12} sm={4} className="align-self-center">
                    <em>Follow us On:</em><br/>
                    <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                    <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                    <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                    <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                    <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                    <a className="btn btn-social-icon btn-dropbox" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                </Col>
            </Row>
        </Jumbotron>)
};

export default Footer;