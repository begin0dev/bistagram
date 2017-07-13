import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as search from '../actions/search';
import * as ui from '../actions/ui';
import * as auth from '../actions/auth';

import Loading from '../components/Loading';

import Userpage from '../components/Search/Userpage';
import Searchmodal from '../components/Search/Searchmodal';
import Innermodal from '../components/Search/Innermodal';
import LogoutModal from '../components/Search/LogoutModal';
import PollowModal from '../components/Search/PollowModal';

import '../css/search.css';

let position =	0;

class SearchUser extends Component {

  constructor(props) {
      super(props);
      this.state={
        keyword: '',
        follower: false,
        following: false
      }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleUserInfo();
  }

  componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

  componentDidUpdate() {
    this.handleUserInfo();
  }

  handleUserInfo = async() =>{
    const {search, searchUser, setLoading, setLoadingInitial} = this.props;
    if(this.state.keyword !== this.props.match.params.keyword){
      if(search.modalState.modal){
        this.handleSearchModal(-1);
      }
      setLoading({name:"search", value:true});
      this.setState({
        keyword: this.props.match.params.keyword,
        follower: false,
        following: false
      });
      await searchUser({nickname: this.props.match.params.keyword}).then(()=>{
        if(!this.props.search.posts.userinfo.username){
          document.location = "/NotFound"
        }
        setTimeout(()=>{ setLoadingInitial() }, 700);
      })
    }
  }

  handleLogoutModal = (value) =>{
    this.props.setMypageModal({name:'logoutModal', value: value})
  }

  handleLogout = async () =>{
		const {logout} = this.props;
		await logout().then(() => document.location = "/");
	}

  handleScroll = () => {
    const { search } = this.props;
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      if(search.posts.moreView && search.posts.isMore && !search.posts.loading){
        this.addUserPost();
      }
    }
  }

  addUserPost = () =>{
    const { search, addUserPost } = this.props;
    addUserPost({username:search.posts.userinfo.username, atcnum: search.posts.userAtcs[search.posts.userAtcs.length-1].atcnum})
  }

  handleSearchModal = (index) =>{
    const { setModalInit, search, getModalPost, setModalPostIndex } = this.props;
    let doc = document.documentElement;
    let atcnum=-1;
    if(index !== -1){
      position = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      atcnum=search.posts.userAtcs[index].atcnum;
      setModalPostIndex(index);
      getModalPost({atcnum: atcnum}).then(()=>{
        document.body.style.position= 'fixed';
        document.body.style.top= -position+'px';
        document.body.style.width= '100%';
      })
    }
    else{
      document.body.style.position= '';
      document.body.style.top= 0;
      document.body.style.width= '';
      window.scrollTo(0, position);
      setModalInit();
    }
  }

  handleBfAfModal = (plusvalue) =>{
    const { search, getModalPost, setModalPostIndex } = this.props;
    let nextindex = search.posts.atcindex+plusvalue;
    let atcnum=search.posts.userAtcs[nextindex].atcnum;
    setModalPostIndex(nextindex);
    getModalPost({atcnum: atcnum});
  }

	handleModalLikeClick = (atcnum) =>{
    const {auth, search, modalPostLike, modalPostNotLike} = this.props;
    if(auth.userinfo.user.username===null){
      document.location = "/"
    }
    if(search.modalpost.atclike.like===1){
      modalPostNotLike({atcnum: atcnum});
    }else{
      modalPostLike({atcnum: atcnum});
    }
	}

  handleInnerModal = () =>{
    this.props.setInnerModal();
  }

  handleFollowModal = (navi) =>{
    const {search} = this.props;
    let userinfo = search.posts.userinfo;
    let doc = document.documentElement;
    if(!this.state.follower && !this.state.following){
      position = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      document.body.style.position= 'fixed';
      document.body.style.top= -position+'px';
      document.body.style.width= '100%';
      if(navi===0){
        this.setState({
          follower: true,
        });
        if(userinfo.follower.length===0){
          this.handleGetFollower();
        }
      }else{
        this.setState({
          following: true,
        });
        if(userinfo.following.length===0){
          this.handleGetFollowing();
        }
      }
    }
    else{
      document.body.style.position= '';
      document.body.style.top= 0;
      document.body.style.width= '';
      window.scrollTo(0, position);
      this.setState({
        follower: false,
        following: false,
      })
    }
  }

  handleGetFollower = () =>{
    const {search, getUserFollower} = this.props;
    let userinfo = search.posts.userinfo;
    if(userinfo.followercount>userinfo.follower.length){
      getUserFollower({username: userinfo.username, start: search.modalState.followerStart});
    }
  }

  handleGetFollowing = () =>{
    const {search, getUserFollowing} = this.props;
    let userinfo = search.posts.userinfo;
    if(userinfo.followingcount>userinfo.following.length){
      getUserFollowing({username: userinfo.username, start: search.modalState.followingStart});
    }
  }

  render() {
    const {search, ui, auth, getModalPost, modalPostInsertReply,
          handleFollowClick,modalPostDeleteReply} = this.props;
    const {follower, following} = this.state;
		return(
        <main className="search_body">

          <Userpage
            ui={ui}
            auth={auth}
            keyword={this.props.match.params.keyword}
            search={search}
            addUserPost={this.addUserPost}
            handleFollowClick={handleFollowClick}
            handleSearchModal={this.handleSearchModal}
            handleLogoutModal={this.handleLogoutModal}
            handleFollowModal={this.handleFollowModal}
          />

          {ui.loading.search && <Loading />}

          {search.modalState.modal &&
            <Searchmodal
              auth={auth}
              search={search}
              atcindex={search.posts.atcindex}
              handleSearchModal={this.handleSearchModal}
              handleBfAfModal={this.handleBfAfModal}
              handleFollowClick={handleFollowClick}
              handleModalLikeClick={this.handleModalLikeClick}
              handleInnerModal={this.handleInnerModal}
              modalPostInsertReply={modalPostInsertReply}
              modalPostDeleteReply={modalPostDeleteReply}
              getModalPost={getModalPost}
            />
          }

          {search.modalState.innerModal&&
            <Innermodal
              handleInnerModal={this.handleInnerModal}
              handleSearchModal={this.handleSearchModal}
            />
          }

          {follower || following ?
            <PollowModal
              auth={auth}
              follow={this.state.follower?search.posts.userinfo.follower:search.posts.userinfo.following}
              loading={search.modalState.followLoading}
              handleFollowModal={this.handleFollowModal}
              handleFollowClick={handleFollowClick}
            />
            :
            null
          }

          {ui.logoutModal &&
            <LogoutModal
              handleLogoutModal={this.handleLogoutModal}
              handleLogout={this.handleLogout}
            />
          }

        </main>
    );
	}
};

const mapStateToProps = (state) => ({
	search:state.search,
  auth:state.auth,
  ui:state.ui
});

const mapDispatchToProps = (dispatch) => ({
	searchUser: (params) => dispatch(search.searchUser(params)),
  addUserPost: (params) => dispatch(search.addUserPost(params)),
  getModalPost: (params) => dispatch(search.getModalPost(params)),
  setModalInit: () => dispatch(search.setModalInit()),
  modalPostLike: (params) => dispatch(search.modalPostLike(params)),
  modalPostNotLike: (params) => dispatch(search.modalPostNotLike(params)),
  modalPostInsertReply: (params) => dispatch(search.modalPostInsertReply(params)),
  modalPostDeleteReply: (params) => dispatch(search.modalPostDeleteReply(params)),
  setModalPostIndex: (index) => dispatch(search.setModalPostIndex(index)),
  setInnerModal: () => dispatch(search.setInnerModal()),
  getUserFollower: (params) => dispatch(search.getUserFollower(params)),
  getUserFollowing: (params) => dispatch(search.getUserFollowing(params)),

	logout: () => dispatch(auth.logout()),

  setLoadingInitial: () => dispatch(ui.setLoadingInitial()),
  setLoading: (params) => dispatch(ui.setLoading(params)),
  setMypageModal: (params) => dispatch(ui.setMypageModal(params))
});


SearchUser = connect(mapStateToProps, mapDispatchToProps)(SearchUser)
export default withRouter(SearchUser);
