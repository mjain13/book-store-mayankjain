import React, {Component} from 'react';

import Add from './Add';
import List from './List';
// import '../scss/';

class App extends Component{
  render(){
    return(
      <div className={'container-fluid'}>
        <div className={'row border-bottom'}>
          <div className={'col-md-5 pt-3'}>
            <h2>Add Book</h2>
            <Add />
            {/* <List /> */}
          </div>
          <div className={'col-md-5 pt-3'}>
            <h2>Book List</h2>
            <List />
          </div>
        </div>

      </div>
    );
  };
};

export default App;
