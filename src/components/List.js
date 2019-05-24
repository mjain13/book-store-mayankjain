import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import ajax from '../utils/ajax';

import read from '../image/ReadBook.png';
import ed1 from '../image/edit.png';
import open from '../image/open-book1.png';
import del1 from '../image/delete.png';
// import readBook from '../image/ReadBook.png';

// import Model from './Model';
import SucessMessage from './SucessMessage';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],                                        //For Books
      book_id: this.props.match.params.book_id,        // For Update 
      obj: [],  
      message:[],
      show1: false
    };
    // this.close = this.close.bind(this);
    // this.show = this.show.bind(this);
    // this.onSearch = this.onSearch.bind(this);
  };

                // ---------------------------For Model---------------------------
  // show(ind1) {
  //   this.setState({
  //     show: true, 
  //     obj: ind1
  //   })
  // };

  // onShow(ind1) {
  //   this.show(ind1);
  // }

              // ------------------------------ Search ---------------------------------
  onSearch(e) {
    let self = this;
    let serachValue = self.refs.textBox.value;
    if (serachValue !== "") {
      let filteredBooks = this.state.books.filter(function (book) {
        let title = book.title, serachValue = self.refs.textBox.value;
        if (!title.indexOf(serachValue)) {
          return (book);
        }
      });
      this.setState({
        books: filteredBooks
      })
    } else {
      ajax({
        url: '/Books',
        type: 'GET'
      }).then(({ d }) => {
        this.setState({ books: d })
      })
    }
  };
              // ------------------------------ Get Book -----------------------------
  componentDidMount() {
    ajax({
      url: '/Books',
      type: 'GET'
    }).then(({ d }) => {
      this.setState({ books: d })
    })
  };
  // shouldComponentUpdate(newProp){
  //   return true;
  // }


              // ------------------------------ Delete Book --------------------------
  onDel(ind) {
    this.setState({
      busy: true
    });
    let Confirmation = window.confirm("Are you sure..You want to Delete the Book..");
    if(Confirmation===true){
      if (ind) {
        ajax({
          url: '/Books',
          postUrl: `?book_id=${ind}`,
          type: 'DELETE',
          data: { ind }
        }).then(({m})=>{
          this.setState({ message: m, show1: !this.state.show1 })
        })
        // ajax({
        //   url: '/Books',
        //   type: 'GET'
        // })
        // .then(({ d }) => {
        //   this.setState({ books: d })
        // })
        // this.componentDidMount();
      }
      this.componentDidMount();
    }
  }
  render() {
    // let ser = this.state.ser; 
    console.log(this.props);
    let books = this.state.books;
    let m = this.state.message;
    console.log(books)
    return (
      <Fragment>
        
        {/* -------------------- Search Bar --------------------- */}
        <form class="form-inline col-md-10">
          <input class="form-control mr-sm-2 col-md-5" type="search" 
            placeholder="Search By Title..." aria-label="Search"
            ref="textBox" />
          <button class="btn btn-outline-success my-2 my-sm-0 col-md-3" type="submit"
            onClick={(e) => { e.preventDefault(); this.onSearch(e) }}>
            {!books ? 'remove' : 'Search'}
            </button>
        </form><br />
        <div className={'row'}>
          {/* ---------------  Loader --------------------------        */}
          {books && !books.length && <div className="d-flex justify-content-center" >
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>}

          {books && books.map((books, k) =>
            <div
              className={`col-md-6 mb-3 px-2`} key={k} >
              <div
                className={'card shadow'}>
                <div
                  className={'card-body .bg-gradient-primary'}>
                  <h5 className={'card-header text-center'}>
                    <img src={read} className="navbar-brand" alt={read}></img>
                    {books.title}
                  </h5>
                  <h6 className={'card-body card-subtitle mb-2 text-muted text-center'}>
                    {`By `}<strong>{books.author}</strong>
                  </h6>
                  <div >
                    <p className={'card-text border-bottom mb-3 pb-2'}>
                      {books.description}
                    </p>
                  </div>
                  <div className={'text-center'}>
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
                  {/* <Link>
                    <div
                      onClick={this.onShow.bind(this, books)}
                      title={'Open Book'}
                      className={'card-link center d-inline-block'}>
                      <img src={open} className="navbar-brand" alt={open}></img>
                    </div>
                  </Link> */}
                  <Link
                      to={`/Details/${books.book_id}`}
                      title={'View'}
                      className={'card-link center d-inline-block'}>
                      <img src={open} className="navbar-brand" alt={open}></img>
                  </Link>

                  </div>
                  </div>
              </div>
            </div>
          )}
        </div>
                {/* ----------------- Modal ---------------- */}

        {/* <Model data={this.state.obj} show={this.state.show} onToggle={()=> {
          let {show} = this.state;
          this.setState({
            show: !show
          });
        }} /> */}

        <SucessMessage m={m[0]} show1={this.state.show1} onToggle={()=> {
          let {show1} = this.state;
          this.setState({
            show1: !show1
          });
        }}  />

      </Fragment>
    );
  }
}

export default connect((state) => {
  return {
    books: state.books,
    message: state.message
  }
}
)(List);