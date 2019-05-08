import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { get, del,up } from '../action/books/';
import ajax from '../utils/ajax';

import read from '../image/ReadBook.png';
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      book_id: this.props.match.params.book_id
    };
  };
  componentDidMount() {
    
    ajax({
      url: '/Books',
      type: 'GET'
    }).then(({ d }) => {
      this.setState({ books: d })
    })
  };
  // onUp(ind){
  //   this.props.up(ind);
  // };
  onDel(ind){
    // let { books.book_id } = this.state.books;
      this.setState({
            busy: true
      });
      if(ind){
        ajax({
          url:'/Books',
          postUrl: `?book_id=${ind}`,
          type: 'DELETE',
          data:{ ind }
        }).then(({ s })=> {
          if (s === 's') {
            
          }
          this.setState({
            busy: false,
            books: this.state.books
          });
        this.props.history.push('/');
        });
      }
  }

  componentDidUpdate() {
    // ajax({
    //   url: '/Books',
    // }).then(({ d }) => {
    //   this.setState({ books: d })
    // })
  }

  render() {
    console.log(this.props);
    let books = this.state.books;
    console.log(books)
    return (
      <Fragment>
        <div
          className={'row'}>
          {books && books.map((books, k) =>
            <div
              className={`col-md-6 mb-3 px-2`}key={k} >
              
              <div
                className={'card shadow'}>
                
                <div
                  className={'card-body .bg-gradient-primary'}>
                  
                  <h5
                    className={'card-header text-center'}>
                    <img src={read} class="navbar-brand" alt={read}></img>
                    {books.title}
                  </h5>
                  <h6
                    className={'card-body card-subtitle mb-2 text-muted text-center'}>
                    {`By `}<strong>{books.author}</strong>
                  </h6>
                  <p
                    className={'card-text border-bottom mb-3 pb-2'}>
                    {books.description}
                  </p>
                  <Link
                    // onClick={this.onUp.bind(this, books.book_id)}
                    to={`/Edit/${books.book_id}`}
                    className={'card-link'}>
                    {'Edit'}
                  </Link>
                  <button
                    onClick={this.onDel.bind(this, books.book_id)}
                    to={`Delete/${books.book_id}`}
                    className={'card-link text-danger'}>
                    {'Delete'}
                  </button>
                  {/* <button
                    to={`View/${books.book_id}`}
                    className={'card-link float-right'}>
                    {'View'}
                  </button> */}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* {books && !books.length && <li className={'list-group-item font-weight-bold text-center'}>{'Loading Books, Please wait ..'}</li>} */}
        {books && !books.length &&<div className="spinner-border justify-content-center" role="status" >
          <span className="sr-only">Loading...</span>
        </div>}
        {/* {books && !books.length && <li className={'list-group-item font-weight-bold text-center'}>{'No Product Added!'}</li>} */}
      </Fragment>
    );
  }
}

export default connect((state) => {
  return {
    books: state.books
  }
},
  {
    get,
    del,
    up
  }
)(List);