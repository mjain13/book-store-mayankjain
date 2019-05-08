// import ajax from '/WorkSpace-React/newbookstore/src/utils/ajax.js';
import ajax from "utils/ajax";

function add(payload){
    return{
        type: 'ADD_BOOK',
        payload
    };
};

function get(){
    return{
        type: 'GET_BOOK',
        payload: ajax({
            url: '/Books'
        })
    };
};

function del(){
    return{
        type: 'DEL_BOOK',
        payload: ajax({
            url: '/Books'
        })
    };

};
function up(){
    return{
        type: 'UP_BOOK',
        payload: ajax({
            url: '/Books'
        })
    };

};
export {
    add,
    get,
    del,
    up
};