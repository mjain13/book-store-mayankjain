import React, { Component } from 'react';
import {connect} from "react-redux";
import ReactDOM from 'react-dom';

// import ajax from '../utils/ajax';
import { Modal } from 'react-bootstrap';

class Model extends Component{

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
      };

    close() {
          this.props.onToggle();    //onToggle method is in list page and through this method we are set the value as false
      };


    render(){
        return(
            
          <Modal show={this.props.show}>
            <Modal.Header closeButton onClick={this.close} className="bg-primary">
              <Modal.Title>Title:{this.props.data.title}
              </Modal.Title>
            </Modal.Header>
            {this.props.data != null ?
            <Modal.Body>
              {this.props.data.description}
              <br /><br /><div className={"text-right"}>
                By :{this.props.data.author} 
                </div>
              </Modal.Body> : 'No data'}
            <Modal.Footer className="bg-secondary">
              <button className={"btn btn-link-green"} onClick={this.close}><h6>Close</h6></button>
            </Modal.Footer >
          </Modal>
       
        )
    }
}

export default Model;