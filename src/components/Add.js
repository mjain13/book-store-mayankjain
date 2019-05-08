import React, { Component } from 'react';
import {connect} from "react-redux";
import ReactDOM from 'react-dom';

import ajax from '../utils/ajax';

class Add extends Component {
  constructor(props) {
    super(props);
     this.state = {
      book_id: this.props.match.params.book_id,
      title: '',
      description: '',
      author: '',
      busy: false
    };
  };
  componentDidMount() {
    let { book_id } = this.state;
    if (book_id) {
      ajax({
          url: '/Books',
          type: 'GET',
          postUrl: `&book_id=${book_id}`
      }).then(({ s, d })=> {
        if (s === 's') {
          let { title, description, author } = d;
          this.setState({
            title:  title, 
            description, author
          });
        }
      });
    }
  };

  onChangeForm(f, { target }) {
    this.setState({
      [f]: target.value
    });
  };

  onAdd(e) {
    e.preventDefault();
    let { book_id, title, description, author } = this.state;
    this.setState({
      busy: true
    });
    if (book_id) {
      ajax({
        url: '/Books',
        type: 'PUT',
        data: { book_id, title, description, author }
      }).then(({ s })=> {
        if (s === 's') {
          this.setState({
            title: '',
            description: '',
            author: ''
          });
        }
        this.setState({
          busy: false
        });
        this.props.history.push(`/List`);
      });
    } else {
      ajax({
        url: '/Books',
        type: 'POST',
        data: { title, description, author }
      }).then(({ s })=> {
        if (s === 's') {
          this.setState({
            title: '',
            description: '',
            author: ''
          });
        }
        this.setState({
          busy: false
        });
        this.props.history.push(`/`);
      });
    }
    ReactDOM.findDOMNode(this.refs.title).focus();
  };

  render() {
    let { book_id, title, description, author, busy } = this.state;
    return (
      <form className = {'row-group'}
        onSubmit={this.onAdd.bind(this)}>
        <div
          className={'row form-group shadow-sm field-center'}>

          <div
            className={'form-group col-md-10 '}>
            <label for="formGroupExampleInput font-weight-bold">Book Title:</label>
            <input
              ref={'title'}
              disabled={busy}
              autoFocus
              value={title}
              onChange={this.onChangeForm.bind(this, 'title')}
              className={'form-control'}
              type={'text'}
              placeholder={'Book Title ..'}
            />
          </div>

          <div
            className={'form-group col-md-10'}>
            <label for="formGroupExampleInput">Author Name:</label>
            <input
              disabled={busy}
              onChange={this.onChangeForm.bind(this, 'author')}
              value={author}
              className={'form-control'}
              type={'text'}
              placeholder={'Book Author ..'}
            />
          </div>
          <div
            className={'form-group col-md-10'}>
            <textarea
              disabled={busy}
              onChange={this.onChangeForm.bind(this, 'description')}
              value={description}
              className={'form-control'}
              type={'number'}
              rows={10}
              placeholder={'Book Description ..'}
            />
          </div>
          <div
            className={'form-group col-md-10'}>
            <button
              disabled={busy}
              className={'btn btn-primary btn-block'}
              type={'submit'}>
              {book_id ? 'Update' : 'Add'}
            </button>
          </div>

        </div>
      </form>
    );
  }
}

export default connect()(Add);