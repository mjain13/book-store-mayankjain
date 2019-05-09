import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import icon from '../image/icon.png';
import read from '../image/ReadBook.png';
class Header extends Component{
    render(){
        return(
            <nav className={'navbar navbar-expand-lg  bg-light bg-dark'}>
            <img src={icon} class="navbar-brand" alt={read}></img>
                <NavLink 
                    // to={'/'}
                    // activeStyle ={{color:'white'}}
                    className={'navbar-brand href="#"'}>
                    {'Book Store'}
                </NavLink>
                <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                 </button>
                <div className={'collapse navbar-collapse '} id="navbarNav">
                    <ul className={'navbar-nav '}>
                        <li className={'nav-item active'}>
                            <NavLink to={'/Add'} className="nav-link" href="#" activeStyle ={{color:'green'}}>
                                {' Add Books'}
                                <span className="sr-only">(current)</span>
                            </NavLink>
                        </li>&emsp;
                        <li className={'nav-item'}>
                            <NavLink to={'/List'} className="nav-link" href="#" activeStyle ={{color:'green'}}>
                                {'Book List'}
                            </NavLink>
                        </li >&emsp;
                        {/* <li className={'nav-item'} >
                            <NavLink to={'/Details'} activeStyle ={{color:'green'}}>
                            {'Details'}
                            </NavLink>
                        </li> */}
                    </ul>
                </div>
            </nav>
        );
    }
};

export default connect((state)=>{
    return{
        Books: state.Books
    };
})(Header);