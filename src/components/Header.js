import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import icon from '../image/icon.png';
import read from '../image/ReadBook.png';
class Header extends Component{
    render(){
        return(
            <nav className={'navbar navbar-expand  bg-light bg-dark'}>
            <img src={icon} class="navbar-brand" alt={read}></img>
                <NavLink 
                    className={'navbar-brand href="#"'}>
                    {'Book Store'}
                </NavLink>
                <div className={'row navbar'} id="navbarNav">
                    <ul className={'navbar-nav '}>
                        <li className={'row nav-item'}>
                            <NavLink to={'/Add'} className="nav-link" href="#" activeStyle ={{color:'green'}}>
                                {' Add Books'}
                            </NavLink>
                        </li>&emsp;
                        <li className={'nav-item'}>
                            <NavLink to={'/List'} className="nav-link" href="#" activeStyle ={{color:'green'}}>
                                {'Book List'}
                            </NavLink>
                        </li >&emsp;
                        {/* <li className={'nav-item'}>
                            <NavLink to={'/Details'} className="nav-link" href="#" activeStyle ={{color:'green'}}>
                                {'Book Detail'}
                            </NavLink>
                        </li >&emsp; */}
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