// import ajax from '/WorkSpace-React/newbookstore/src/utils/ajax.js';
import ajax from "utils/ajax";

// function add(payload){
//     return{
//         type: 'ADD_BOOK',
//         payload
//     };
// };

function getBooks(){
    return{
        type: 'GET_BOOK',
        payload: ajax({
            url: '/Books'
        }).then(({ d }) => {
            this.setState({ books: d })
          })
    };
};

// function del(){
//     return{
//         type: 'DEL_BOOK',
//         payload: ajax({
//             url: '/Books'
//         })
//     };

// };
// function up(){
//     return{
//         type: 'UP_BOOK',
//         payload: ajax({
//             url: '/Books'
//         })
//     };

// };
export {
    
    getBooks
    // add,
    // get,
    // del,
    // up
};