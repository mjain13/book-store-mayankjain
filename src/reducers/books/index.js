export default function(state = null, action) {
    switch(action.type){
        // case 'ADD_BOOK':{
        //     return action.payload;
        // };
        case 'DEL_BOOK':{
            return action.payload;
        };        
        case 'GET_BOOK':
            console.log(action.payload.d);
            return action.payload.d;        
        
        default:
            return state;
        
    };
}
