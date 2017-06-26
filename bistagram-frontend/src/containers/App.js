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
import * as history from '../actions/history';

import '../css/basic.css';
import '../css/header.css';
import '../css/followUl.css';

class App extends React.Component{

	handleHeaderModal = async () =>{
		const {ui, setHeaderModal, getHistory} = this.props;
		setHeaderModal();
		if(!ui.headerModal){
			console.log("히스토리불러올거임")
			await getHistory();
		}
	}

	handleLogout = async () =>{
		const {logout} = this.props;
		await logout().then(() => document.location = "/");
	}

	handleScroll = () => {
		const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		const {ui, post, setHeader} = this.props;
		let result=true;
		if(ui.headerModal){
			result=true;
		}else if(scrollTop > 90){
			result=false;
		}else if(post.status.modal){
			result=false;
		}else{
			result=true;
		}
		if(result!==ui.header){
			setHeader(result);
		}
	}

	async componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
		await this.props.checkSession().then(()=>this.handleCheckLogin());
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
		const {auth, ui} = this.props;
		return(
			<Router>
				<section className="react-body">
					{auth.session.logged ?
					<Header
						ui={ui}
						userinfo={auth.userinfo}
						headDisplay={ui.header}
						handleHeaderModal={this.handleHeaderModal}
						handleLogout={this.handleLogout}
					/>:
					null}
					{ui.loading.main?<div className="loding_div loding_lgimg"></div>:null}
					<Switch>
						<Route exact path="/" component={auth.session.logged?Posts:Login}/>
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
	setHeaderModal: () => dispatch(ui.setHeaderModal()),

	getHistory: () => dispatch(history.getHistory())
})

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
