import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { get, del,up } from '../action/books/';
import ajax from '../utils/ajax';
import {Modal} from 'react-bootstrap';

import read from '../image/ReadBook.png';
import ed1 from '../image/edit.png';
import open from '../image/open-book1.png';
import del1 from '../image/delete.png';
class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      book_id: this.props.match.params.book_id,
      show: false,
      obj: []
    };
    this.close = this.close.bind(this);
    this.show= this.show.bind(this);
  };
  show(ind1){
    this.setState({
      show: true, obj: ind1
    })
  };
  close(){
    this.setState({
    show:false
    });
  };
  onShow(ind1){
    this.show(ind1);
  }
  componentDidMount() {
      ajax({
      url: '/Books',
      type: 'GET'
    }).then(({ d }) => {
      this.setState({ books: d })
    })
  };
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
  ondel1(e){
    e.preventDefault();
    let { book_id } = this.props;
    ajax({
      url: '/Books',
      type: 'DELETE',
      postUrl:`&book_id=${book_id}`
    }).then(({ s })=> {
      if (s === 's') {
        this.setState({
        });
      }
      this.props.history.push(`/`);
    });
  }
  render() {
    console.log(this.props);
    let books = this.state.books;
    console.log(books)
    return (
      <Fragment>
        <div
          className={'row'}>
                           {/* ---------------  Loader --------------------------        */}
        {books && !books.length &&<div className="text-center" >
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>}
          {books && books.map((books, k) =>
            <div
              className={`col-md-6 mb-3 px-2`}key={k} > 
                          
              <div
                className={'card shadow'}>
                <div
                  className={'card-body .bg-gradient-primary'}>
                  <h5
                    className={'card-header text-center'}>
                    <img src={read} className="navbar-brand" alt={read}></img>
                    {books.title}
                  </h5>
                  <h6
                    className={'card-body card-subtitle mb-2 text-muted text-center'}>
                    {`By `}<strong>{books.author}</strong>
                  </h6>
                  <div>
                  <p
                    className={'card-text border-bottom mb-3 pb-2'}>
                    {books.description}
                  </p>
                  </div>
                  <Link
                    to={`/Edit/${books.book_id}`}
                    title={'Edit Book'}
                    className={'card-link '}>
                    <img src={ed1} className="navbar-brand" alt={ed1}></img>
                  </Link>                
                  <Link
                      to={`/List/${books.book_id}`}>
                    <div 
                      onClick={this.onDel.bind(this, books.book_id)}
                      title={'Delete Book'}
                      className={'card-link center d-inline-block'}>
                      <img src={del1} className="navbar-brand" alt={del1}></img>
                    </div>
                  </Link>
                  <Link>
                       {/* to={`/List/${books.book_id}`}> */}
                    <div 
                      onClick={this.onShow.bind(this, books)}
                      title={'Open Book'}
                      className={'card-link center d-inline-block'}>
                      <img src={open} className="navbar-brand" alt={open}></img>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
                {/* ----------------- Modal ---------------- */}
        <form className={"form-group shadow p-3 mb-5 bg-light rounded"} >
          <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header closeButton className="bg-primary">
          <Modal.Title>Title: {this.state.obj.title}</Modal.Title>
          </Modal.Header>
          {this.state.obj !=null ? 
          <Modal.Body>{this.state.obj.description}<br/><br/><div className={"text-right"}>
          By :{this.state.obj.author} </div>
          </Modal.Body> : 'No data'}
          <Modal.Footer className="bg-secondary">
          <button className={"btn btn-link-green"} onClick={this.close}><h6>Close</h6></button>
          </Modal.Footer >
          </Modal>
        </form>
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