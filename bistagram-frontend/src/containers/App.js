import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../components/Header/Header';

import Login from './Login';
import Posts from './Posts';
import Explore from './Explore';
import NotFound from './NotFound';

import { storage } from '../helpers';

import * as auth from '../actions/auth';

import '../css/basic.css';
import '../css/header.css';
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
		this.state={
			headDisplay:true
		}
	}
	handleScroll = () => {
		const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
		const windowBottom = windowHeight + window.pageYOffset;
		const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

		if(scrollTop > 90){
			this.setState({
				headDisplay: false
			});
		} else{
			this.setState({
				headDisplay: true
			});
		}
		if (windowBottom >= docHeight) {

		} else {
				return;
		}
	}
	async componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
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
      if(!session.logged && (window.location.pathname === "/explore")){
				document.location = "/"
      }
    }

		await this.props.checkSession();

		if(!this.props.auth.session.logged){
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
		}else {
      if (!session.logged) {
        // got a new session
        storage.set('session', {
            ...this.props.auth.session
        });
      }
    }
  }
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}
	render(){
		let session = storage.get('session');
		return(
			<Router>
				<section className="react-body">
					{storage.get('session').logged ?<Header headDisplay={this.state.headDisplay}/>:null}
					<Switch>
						<Route exact path="/" component={session.logged?Posts:Login}/>
						<Route path="/explore" component={Explore}/>
						<Route component={NotFound}/>
					</Switch>
				</section>
			</Router>
		);
	}
};

const mapStateToProps = (state) => ({
  auth: state.auth
});
const mapDispatchToProps = (dispatch) => ({
	checkSession: () => dispatch(auth.checkSession())
})

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
