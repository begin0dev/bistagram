import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

import {storage} from '../helpers';

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
        redirect: ''
      }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleUserInfo();
  }
  componentDidUpdate() {
    this.handleUserInfo();
  }
  componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}
  handleUserInfo = async() =>{
    const {search, searchUser, setLoading, setLoadingInitial, setFollowModalInitial} = this.props;
    if(this.state.keyword !== this.props.match.params.keyword){
      if(search.modalState.modal){
        this.handleSearchModal(-1);
      }
      setLoading({name:"search", value:true});
      setFollowModalInitial();
      this.setState({
        keyword: this.props.match.params.keyword
      });
      await searchUser({nickname: this.props.match.params.keyword}).then(()=>{
        if(!this.props.search.posts.userinfo.username){
          this.setState({
            redirect: '/NotFound'
          });
        }
        setTimeout(()=>{ setLoadingInitial() }, 400);
      })
    }
  }

  handleLogoutModal = (value) =>{
    this.props.setUiModal({name:'logoutModal', value: value});
  }

  handleLogout = async () =>{
		const {logout} = this.props;
		await logout().then(() => {
      storage.set('session', { logged: false });
      document.location = "/"
    });
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
    if(!auth.userinfo.user.username){
      document.location = "/"
    }else{
      if(search.modalpost.atclike.like===1){
        modalPostNotLike({atcnum: atcnum});
      }else{
        modalPostLike({atcnum: atcnum});
      }
    }
	}

  handleInnerModal = () =>{
    this.props.setInnerModal();
  }

  handleFollowModal = (navi) =>{
    const {ui, search, setUiModal, setFollowModalInitial} = this.props;
    let userinfo = search.posts.userinfo;
    let doc = document.documentElement;
    if(!ui.followerModal && !ui.followingModal){
      position = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      document.body.style.position= 'fixed';
      document.body.style.top= -position+'px';
      document.body.style.width= '100%';
      if(navi===0){
        setUiModal({name:'followerModal', value: true})
        if(userinfo.follower.length===0){
          this.handleGetFollower();
        }
      }else{
        setUiModal({name:'followingModal', value: true})
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
      setFollowModalInitial();
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

  handlePostDelete = async() =>{
    const {search,deleteModalPost} = this.props;
    let post=search.modalpost;
    await deleteModalPost({atcnum: post.atcnum, media: post.media}).then(()=>{
      document.body.style.position= '';
      document.body.style.top= 0;
      document.body.style.width= '';
      window.scrollTo(0, position);
    });
  }

  render() {
    const {search, ui, auth, getModalPost, modalPostInsertReply, changeModalInfo,
          handleFollowClick,modalPostDeleteReply, modalPostGetAllReplies} = this.props;
		return(
        <main className="search_body">
          {this.state.redirect && <Redirect to={this.state.redirect}/>}
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
              modalPostGetAllReplies={modalPostGetAllReplies}
              getModalPost={getModalPost}
              changeModalInfo={changeModalInfo}
            />
          }

          {search.modalState.innerModal&&
            <Innermodal
              handleInnerModal={this.handleInnerModal}
              handleSearchModal={this.handleSearchModal}
              handlePostDelete={this.handlePostDelete}
              deletePossible={auth.userinfo.user.username===search.modalpost.username
                              && search.modalpost.replycount===0
                              && search.modalpost.atclike.likecount===0?true:false}
            />
          }

          {ui.followerModal || ui.followingModal ?
            <PollowModal
              auth={auth}
              ui={ui}
              follow={ui.followerModal?search.posts.userinfo.follower:search.posts.userinfo.following}
              loading={search.modalState.followLoading}
              handleFollowModal={this.handleFollowModal}
              handleFollowScroll={this.handleFollowScroll}
              handleGetFollower={this.handleGetFollower}
              handleGetFollowing={this.handleGetFollowing}
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
  modalPostGetAllReplies: (params) => dispatch(search.modalPostGetAllReplies(params)),
  setModalPostIndex: (index) => dispatch(search.setModalPostIndex(index)),
  setInnerModal: () => dispatch(search.setInnerModal()),
  getUserFollower: (params) => dispatch(search.getUserFollower(params)),
  getUserFollowing: (params) => dispatch(search.getUserFollowing(params)),
  deleteModalPost: (params) => dispatch(search.deleteModalPost(params)),
  changeModalInfo: (params) => dispatch(search.changeModalInfo(params)),

	logout: () => dispatch(auth.logout()),

  setFollowModalInitial: () => dispatch(ui.setFollowModalInitial()),
  setLoadingInitial: () => dispatch(ui.setLoadingInitial()),
  setLoading: (params) => dispatch(ui.setLoading(params)),
  setUiModal: (params) => dispatch(ui.setUiModal(params))
});

SearchUser = connect(mapStateToProps, mapDispatchToProps)(SearchUser)
export default withRouter(SearchUser);
