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
				logged: false
			});
		}
		this.state={
			headDisplay:true
		}
		this.handleLogout=this.handleLogout.bind(this);
	}

	async handleLogout() {
		const {logout} = this.props;
		await logout().then(()=>document.location = "/login");
		storage.set('session', { logged: false });
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
		}else if(this.props.post.status.modal){
			this.setState({
				headDisplay: false
			});
		}else{
			this.setState({
				headDisplay: true
			});
		}
		if (windowBottom >= docHeight) {

		}
	}

	async componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
    let session = storage.get('session');
    if (session) {
      if (session.expired) {
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
      if(!session.logged && (window.location.pathname === "/" || window.location.pathname === "/explore")){
				document.location = "/login"
      }
    }

		await this.props.checkSession();

		if(!this.props.auth.session.logged){
			storage.set('session', {
				 ...session,
				 logged: false
			});
			if(session.logged){
				// session is expired
				storage.set('session', {
					...session,
					expired: true
				});
				document.location.reload();
			}
		}else { //login
      if (!session.logged) {
        // got a new session
        storage.set('session', {
            ...this.props.auth.session,
						logged: true
        });
				document.location.reload();
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
					{session.logged ?<Header headDisplay={this.state.headDisplay} handleLogout={this.handleLogout}/>:null}
					<Switch>
						<Route exact path="/" component={Posts}/>
						<Route path="/login" component={Login}/>
						<Route path="/explore" component={Explore}/>
						<Route component={NotFound}/>
					</Switch>
				</section>
			</Router>
		);
	}
};

const mapStateToProps = (state) => ({
  auth: state.auth,
	post: state.post
});
const mapDispatchToProps = (dispatch) => ({
	checkSession: () => dispatch(auth.checkSession()),
	logout: () => dispatch(auth.logout())
})

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
