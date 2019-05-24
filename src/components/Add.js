import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import ReactDOM from 'react-dom';

import ajax from '../utils/ajax';
import SucessMessage from './SucessMessage';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book_id: this.props.match.params.book_id,
      title: '',
      description: '',
      author: '',
      busy: false,
      show1: false,
      message: []
    };
  };
  componentDidMount() {
    let { book_id } = this.state;
    if (book_id) {
      ajax({
        url: '/Books',
        type: 'GET',
        postUrl: `&book_id=${book_id}`
      }).then(({ s, d }) => {
        if (s === 's') {
          let { title, description, author } = d;
          this.setState({
            title: title,
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
      }).then(({ m }) => {
        this.setState({ message: m, show1: !this.state.show1 })
      })
      this.setState({
        title: '',
        description: '',
        author: '',
        busy: false
      });

      setTimeout(() => {
        this.props.history.push(`/List`);         
      }, 5000)

    } else {
      ajax({
        url: '/Books',
        type: 'POST',
        data: { title, description, author }
      }).then(({ m }) => {
        this.setState({ message: m, show1: !this.state.show1 })
      })
       // if (s === 's') {
          this.setState({
            title: '',
            description: '',
            author: '',
            busy: false
          });

        // if(this.show1 === false){
          setTimeout(() => {
            this.props.history.push(`/List`);         
          }, 5000)
  
        // }
    }
    ReactDOM.findDOMNode(this.refs.title).focus();
  };

  render() {
    let { book_id, title, description, author, busy } = this.state;
    let m = this.state.message;
    return (
      <fragment>
        <SucessMessage m={m[0]} show1={this.state.show1} onToggle={() => {
          let { show1 } = this.state;
          this.setState({
            show1: !show1
          });
        }} />

        <form
          onSubmit={this.onAdd.bind(this)}>
          <div
            className={'form-group shadow-sm field-center col-md-9'}>
            <br />
            <div
              className={'form-group '}>
              <label for="formGroupExampleInput font-weight-bold">Book Title:</label>
              <input
                ref={'title'}
                disabled={busy}
                autoFocus
                value={title}
                onChange={this.onChangeForm.bind(this, 'title')}
                className={'form-control shadow'}
                type={'text'}
                placeholder={'Book Title ..'}
              />
            </div>
            <div
              className={'form-group'}>
              <label for="formGroupExampleInput">Author Name:</label>
              <input
                disabled={busy}
                onChange={this.onChangeForm.bind(this, 'author')}
                value={author}
                className={'form-control shadow'}
                type={'text'}
                placeholder={'Book Author ..'}
              />
            </div>
            <div
              className={'form-group '}>
              <textarea
                disabled={busy}
                onChange={this.onChangeForm.bind(this, 'description')}
                value={description}
                className={'form-control shadow'}
                type={'number'}
                rows={9}
                placeholder={'Book Description ..'}
              />
            </div>
            <div
              className={'form-group'}>
              <button
                disabled={busy}
                className={'btn btn-primary btn-block shadow'}
                type={'submit'}>
                {book_id ? 'Update' : 'Add'}
              </button>
            </div>
            <br />
          </div>
        </form>
      </fragment>
    );
  }
}

export default connect()(Add);