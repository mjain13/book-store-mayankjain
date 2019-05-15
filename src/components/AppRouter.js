import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from 'react-router-redux';

import store from '../utils/store';
import history from '../utils/history';
import List from '../components/List';
import Add from '../components/Add';
import Header from '../components/Header';
// import Details from './Details';

class AppRouter extends Component{
    render(){
        return(
            <Router basename={'/'}>
                <ConnectedRouter
                    store={store}
                    history={history}>
                    <Fragment>
                        <Header />
                        <div className={'container-fluid'}>
                            <div className={'row'}>
                                <div className={'col-md-8 offset-md-2 mt-3'}>
                                    <Switch>
                                        <Route 
                                            component={List}
                                            exact ={true}
                                            path={'/List'}
                                        />
                                        <Route 
                                            component={Add}
                                            exact ={true}
                                            path={'/Add'}
                                        />
                                        <Route 
                                            component={List}
                                            exact ={true}
                                            path={'/'}       
                                        />
                                        <Route 
                                            component={Add}
                                            exact ={true}
                                            path={'/Details'}       
                                        />
                                        <Route 
                                            component={Add}
                                            exact ={true}
                                            path={'/Edit/:book_id'}       
                                        />
                                        <Route 
                                            component={List}
                                            exact ={true}
                                            path={'/List/:book_id'}       
                                        />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                </ConnectedRouter>
            </Router>
        );
    }
}
export default AppRouter;