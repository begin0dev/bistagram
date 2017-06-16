import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Posts from './Posts';
import Explore from './Explore';

import { storage } from '../helpers';

import '../css/basic.css';
import '../css/login.css';
import '../css/posts.css';
import '../css/header.css';
import '../css/postview.css';
import '../css/followUl.css';

class App extends React.Component{
	constructor(props) {
		super(props);
		let session = storage.get('session');
		if (!session) {
			storage.set('session', {
					user: null,
					logged: false
			});
		}
	}
	componentDidMount() {
    let session = storage.get('session');
    if (session) {
      if (session.expired) {
          //toastr.error('Your session is expired');
          storage.set('session', {
              ...session,
              expired: false
          });
					setTimeout(
							() => {
									document.location = '/'
							}, 1000
					);
          return;
      }
      if(!session.logged && (window.location.pathname === "/posts" || window.location.pathname === "/explore")){
         document.location = "/"
      }
    }
		if(!this.props.auth.session){
			storage.set('session', {
				 ...session,
				 logged: false
			});
			if (session.logged) {
				// session is expired
				session = storage.get('session');
				storage.set('session', {
					...session,
					expired: true
				});
				document.location.reload();
			}
		}
  }
	render(){
		let session = storage.get('session');
		return(
			<Router>
				<Switch>
					<Route exact path="/" component={session.logged?Posts:Login}/>
					<Route path="/explore" component={Explore}/>
				</Switch>
			</Router>
		);
	}
};

const mapStateToProps = (state) => ({
  auth: state.auth
});
const mapDispatchToProps = (dispatch) => ({

})

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
