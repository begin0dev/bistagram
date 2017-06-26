import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../components/Header/Header';
import Login from './Login';
import Posts from './Posts';
import Explore from './Explore';
import NotFound from './NotFound';

import * as auth from '../actions/auth';
import * as ui from '../actions/ui';

import '../css/basic.css';
import '../css/header.css';
import '../css/followUl.css';

class App extends React.Component{

	handleLogout = async () =>{
		const {logout} = this.props;
		await logout().then(() => document.location = "/");
	}

	handleScroll = () => {
		const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		const {post, setHeader} = this.props;
		if(scrollTop > 90){
			setHeader(false);
		}else if(post.status.modal){
			setHeader(false);
		}else{
			setHeader(true);
		}
	}

	async componentDidMount() {
		const {setLoading} = this.props;
		window.addEventListener("scroll", this.handleScroll);
		await this.props.checkSession().then(()=>this.handleCheckLogin());
		setLoading(false)
  }

	handleCheckLogin = () =>{
		const { auth } = this.props;
		if(!auth.session.logged){ //not login
			if(window.location.pathname === "/explore"){
				document.location = "/"
			}
		}
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	render(){
		return(
			<Router>
				<section className="react-body">
					{this.props.auth.session.logged ?
					<Header headDisplay={this.props.ui.header}
					handleLogout={this.handleLogout}/>:
					null}
					{this.props.ui.loading?<div className="loding_div loding_lgimg"></div>:null}
					<Switch>
						<Route exact path="/" component={this.props.auth.session.logged?Posts:Login}/>
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
	ui: state.ui,
	post: state.post
});
const mapDispatchToProps = (dispatch) => ({
	checkSession: () => dispatch(auth.checkSession()),
	logout: () => dispatch(auth.logout()),

	setHeader: (value) => dispatch(ui.setHeader(value)),
	setLoading: (value) => dispatch(ui.setLoading(value))
})

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
