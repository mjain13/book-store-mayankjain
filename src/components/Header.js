import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import icon from '../image/icon.png';
import read from '../image/ReadBook.png';
class Header extends Component{
    render(){
        // let { books } = this.props;
        return(
            <nav className={'navbar navbar-expand-lg navbar-light bg-light bg-dark'}>
            <img src={icon} class="navbar-brand" alt={read}></img>
                <NavLink 
                    to={'/'}
                    activeStyle ={{color:'white'}}
                    className={'navbar-brand'}>
                    {'Book Store'}
                </NavLink>
                <div className={'collapse navbar-collapse'}>
                    <ul className={'navbar-nav mr-auto'}>
                        <li className={'nav-item'}>
                            <NavLink to={'/Add'} activeStyle ={{color:'green'}}>
                                {' Add Books'}
                            </NavLink>
                        </li>&emsp;
                        <li className={'nav-item'}>
                            <NavLink to={'/List'} activeStyle ={{color:'green'}}>
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