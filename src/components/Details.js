import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';
// import read from '../image/ReadBook.png';
import bookpic from '../image/Book.png';
import ajax from '../utils/ajax';

 class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
          book_id: this.props.match.params.book_id,
          title: '',
          description: '',
          author: '',
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

    render() {
        let { book_id, title, description, author, busy } = this.state;
        return (
            <div style={{"height": "2px"}}>
                <Carousel style={{"margin":"auto"}}>
                <Carousel.Item className="text-center">
                    <img
                        src={bookpic}
                        alt={bookpic}
                    />
                    <Carousel.Caption style={{"color":"#333","bottom": "248px"}} >
                        <h3 middele>Book Title</h3>
                        <p class="font-italic-bolder">{this.state.title}</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item className="text-center">
                    <img
                        src={bookpic}
                        alt={bookpic}
                    />

                    <Carousel.Caption style={{"color":"#333","top": "20px"}}>
                        <h3>Book Description</h3>
                        <p class="font-italic-bolder">{this.state.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item className="text-center">
                    <img
                        src={bookpic}
                        alt={bookpic}
                    />

                    <Carousel.Caption style={{"color":"#333","bottom": "248px"}}>
                        <h3>Thank You</h3>
                       Book Author: <p class="font-italic-bold">{this.state.author}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>
        )
    }
}    

export default Details;