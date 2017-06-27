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
		const {ui, setHeaderModal, getHistory, changeUserData, setLoading, setLoadingInitial} = this.props;
		setLoading({name:"history", value:true});
		setHeaderModal();
		if(!ui.headerModal){
			await getHistory().then(()=>{
				changeUserData({form:'userinfo', name:'hiscount', value:0});
				setLoadingInitial();
			});
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
		const { auth } = this.props;

		window.addEventListener("scroll", this.handleScroll);
		await this.props.checkSession().then(()=>{
			if(!auth.userinfo.logged){ //not login
				if(window.location.pathname === "/explore"){
					document.location = "/"
				}
			}
		});
  }

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	render(){
		const {auth, ui, history} = this.props;
		return(
			<Router>
				<section className="react-body">
					{auth.logged ?
					<Header
						ui={ui}
						history={history}
						userinfo={auth.userinfo}
						headDisplay={ui.header}
						handleHeaderModal={this.handleHeaderModal}
						handleLogout={this.handleLogout}
					/>:
					null}
					{ui.loading.main?<div className="loding_div loding_lgimg"></div>:null}
					<Switch>
						<Route exact path="/" component={auth.logged?Posts:Login}/>
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
	post: state.post,
	history: state.history
});

const mapDispatchToProps = (dispatch) => ({
	changeUserData: (params) => dispatch(auth.changeUserData(params)),
	checkSession: () => dispatch(auth.checkSession()),
	logout: () => dispatch(auth.logout()),

	setHeader: (value) => dispatch(ui.setHeader(value)),
	setHeaderModal: () => dispatch(ui.setHeaderModal()),

	getHistory: () => dispatch(history.getHistory()),

	setLoadingInitial: () => dispatch(ui.setLoadingInitial()),
	setLoading: (params) => dispatch(ui.setLoading(params))
})

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
