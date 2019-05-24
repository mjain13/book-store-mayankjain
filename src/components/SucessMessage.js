import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class SucessMessage extends Component{

    constructor(props) {
        super(props);
        this.close1 = this.close1.bind(this);
      };
    close1() {
          this.props.onToggle();    //onToggle method is in list page and through this method we are set the value as false
    };

    render(){
        return(                             
        <Modal show={this.props.show1}>
            <Modal.Header closeButton onClick={this.close1} className="bg-primary">
              <Modal.Title>'Success Message'
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.props.m}
            </Modal.Body>
            <Modal.Footer className="bg-secondary">
              <button className={"btn btn-link-green"} onClick={this.close1}><h6>Close</h6></button>
            </Modal.Footer >
          </Modal>
       
        )
    }
}

export default SucessMessage;