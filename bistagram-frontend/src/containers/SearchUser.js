import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as search from '../actions/search';
import * as ui from '../actions/ui';
import * as auth from '../actions/auth';

import Loading from '../components/Loading';

import Userpage from '../components/Search/Userpage';
import Searchmodal from '../components/Search/Searchmodal';
import Innermodal from '../components/Search/Innermodal';
import LogoutModal from '../components/Search/LogoutModal';

import '../css/search.css';

let position =	0;

class SearchUser extends Component {

  async componentDidMount() {
    const {searchUser, setLoading, setLoadingInitial} = this.props;
    setLoading({name:"search", value:true});
    window.addEventListener("scroll", this.handleScroll);
    await searchUser({nickname: this.props.match.params.keyword}).then(()=>{
      if(!this.props.search.posts.userinfo.username){
        document.location = "/NotFound"
      }
      setTimeout(()=>{ setLoadingInitial() }, 700);
    })
  }

  componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

  handleLogoutModal = (value) =>{
    this.props.setMypageModal({name: 'logoutModal', value: value})
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

  handleSearchModal = async(index) =>{
    const { setModalInit, search, getModalPost, setModalPostIndex } = this.props;
    let doc = document.documentElement;
    let atcnum=-1;
    if(index !== -1){
      position = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      atcnum=search.posts.userAtcs[index].atcnum;
      setModalPostIndex(index);
      await getModalPost({atcnum: atcnum}).then(()=>{
        document.body.style.position= 'fixed';
        document.body.style.top= -position+'px';
        document.body.style.width= '100%';
      })
    }
    else{
      document.body.style='';
      window.scrollTo(0, position);
      setModalInit();
    }
  }

  handleBfAfModal = async(plusvalue) =>{
    const { search, getModalPost, setModalPostIndex } = this.props;

    let nextindex = search.posts.atcindex+plusvalue;
    let atcnum=search.posts.userAtcs[nextindex].atcnum;

    setModalPostIndex(nextindex);
    await getModalPost({atcnum: atcnum});
  }

  handleFollowClick = (username) => {
		const {auth, setFollowUser, following, unfollow} = this.props;
    if(auth.userinfo.user.username===null){
      document.location = "/"
    }
		setFollowUser(username);
		if(auth.userinfo.followInfo.follower.indexOf(username)!==-1){
			unfollow({follower: username});
		}else{
			following({follower: username});
		}
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
  render() {
    const {search, ui, auth, getModalPost, modalPostInsertReply, modalPostDeleteReply} = this.props;
		return(
        <main className="search_body">

          <Userpage
            ui={ui}
            auth={auth}
            keyword={this.props.match.params.keyword}
            search={search}
            addUserPost={this.addUserPost}
            handleFollowClick={this.handleFollowClick}
            handleSearchModal={this.handleSearchModal}
            handleLogoutModal={this.handleLogoutModal}
          />

          {ui.loading.search && <Loading />}

          {search.modalState.modal &&
            <Searchmodal
              auth={auth}
              search={search}
              atcindex={search.posts.atcindex}
              handleSearchModal={this.handleSearchModal}
              handleBfAfModal={this.handleBfAfModal}
              handleFollowClick={this.handleFollowClick}
              handleModalLikeClick={this.handleModalLikeClick}
              handleInnerModal={this.handleInnerModal}
              modalPostInsertReply={modalPostInsertReply}
              modalPostDeleteReply={modalPostDeleteReply}
              getModalPost={getModalPost}
            />
          }
          {search.modalState.innermodal&&
            <Innermodal
              handleInnerModal={this.handleInnerModal}
              handleSearchModal={this.handleSearchModal}
            />
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

  setFollowUser: (username) => dispatch(auth.setFollowUser(username)),
	following: (params) => dispatch(auth.following(params)),
	unfollow: (params) => dispatch(auth.unfollow(params)),
	logout: () => dispatch(auth.logout()),

  setLoadingInitial: () => dispatch(ui.setLoadingInitial()),
  setLoading: (params) => dispatch(ui.setLoading(params)),
  setMypageModal: (params) => dispatch(ui.setMypageModal(params))
});


SearchUser = connect(mapStateToProps, mapDispatchToProps)(SearchUser)
export default SearchUser;
