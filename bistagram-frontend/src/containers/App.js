import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../components/Header/Header';
import Login from './Login';
import Posts from './Posts';
import Search from './Search';
import Explore from './Explore';
import NotFound from './NotFound';

import * as auth from '../actions/auth';
import * as ui from '../actions/ui';

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

	handleFollowClick = (username) => {
		const {auth, setFollowUser, following, unfollow} = this.props;
		setFollowUser(username);
		if(auth.userinfo.followInfo.follower.indexOf(username)!==-1){
			unfollow({follower: username});
		}else{
			following({follower: username});
		}
	}

	async componentDidMount() {
		const { checkSession } = this.props;
		window.addEventListener("scroll", this.handleScroll);
		try{
			await checkSession().then(()=>{
				if(!this.props.auth.userinfo.logged && window.location.pathname === "/explore"){
					document.location = "/"
				}
			});
		}catch(e){
			document.location = "/"
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
					{auth.userinfo.logged ?
					<Header
						ui={ui}
						auth={auth}
						headDisplay={ui.header}
						handleHeaderModal={this.handleHeaderModal}
						handleFollowClick={this.handleFollowClick}
						handleLogout={this.handleLogout}
					/>:
					null}
					{ui.loading.main?<div className="loding_div loding_lgimg"></div>:null}
					<Switch>
						<Route exact path="/" component={auth.userinfo.logged?Posts:Login}/>
						<Route path="/explore" component={Explore}/>
						<Route path="/Search/tags/:keyword" component={Search}/>
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
	getHistory: () => dispatch(auth.getHistory()),

	setFollowUser: (username) => dispatch(auth.setFollowUser(username)),
	following: (params) => dispatch(auth.following(params)),
	unfollow: (params) => dispatch(auth.unfollow(params)),

	setHeader: (value) => dispatch(ui.setHeader(value)),
	setHeaderModal: () => dispatch(ui.setHeaderModal()),

	setLoadingInitial: () => dispatch(ui.setLoadingInitial()),
	setLoading: (params) => dispatch(ui.setLoading(params))
})

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
