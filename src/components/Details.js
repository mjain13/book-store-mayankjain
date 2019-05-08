// import React, { Component } from 'react';
// import axios from 'axios';
// // import APIs from '../utils/api';


// export default class Details extends Component{
//     state = {
//         Books: []
        
//     }
//     componentDidMount(){
//         axios.get('https://books-by-suyashkale.herokuapp.com/APIs/Books')
//         .then(res => {
//             const Books = res.data;
//             this.setState({
//                 Books
//             })
//         } )
//     }

//     render(){
//         return(
//             <ul>
//                 {this.state.Books.map(Books =>
//                      <li>{Books.title}</li>)}
//             </ul>
//         )

//     }
// }