import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as search from '../actions/search';
import * as ui from '../actions/ui';

import Loading from '../components/Loading';

import Hashpage from '../components/Search/Hashpage';
import Searchmodal from '../components/Search/Searchmodal';
import Innermodal from '../components/Search/Innermodal';

import '../css/search.css';

let position =	0;

class SearchHash extends Component {

  async componentDidMount() {
    const {searchHash, setLoading, setLoadingInitial} = this.props;
    setLoading({name:"search", value:true});
    window.addEventListener("scroll", this.handleScroll);
    await searchHash({keyword: this.props.match.params.keyword}).then(()=>{
      setTimeout(()=>{ setLoadingInitial() }, 400);
    })
  }

  componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
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
        this.addHashPost();
      }
    }
  }

  addHashPost = () =>{
    const { search, addHash } = this.props;
    let atcnums=[search.posts.recent[search.posts.recent.length-1].atcnum];
    search.posts.popular.forEach(value=>{
      atcnums=[...atcnums, value.atcnum]
    })
    addHash({keyword:this.props.match.params.keyword, atcnums:atcnums})
  }

  handleSearchModal = (index) =>{
    const { setModalInit, search, getModalPost, setModalPostIndex } = this.props;
    let doc = document.documentElement;
    let atcnum = -1;
    if(index !== -1){
      position = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      if(index<9){
        atcnum=search.posts.popular[index].atcnum;
      }else{
        atcnum=search.posts.recent[index-9].atcnum;
      }
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

  handleBfAfModal = async(plusvalue) =>{
    const { search, getModalPost, setModalPostIndex } = this.props;
    let atcnum = -1;
    let nextindex = search.posts.atcindex+plusvalue;
      if(nextindex<9){
        atcnum=search.posts.popular[nextindex].atcnum;
      }else{
        atcnum=search.posts.recent[nextindex-9].atcnum;
      }

    setModalPostIndex(nextindex);
    await getModalPost({atcnum: atcnum});
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
    console.log("작동")
    this.props.setInnerModal();
  }
  render() {
    const {search, ui, auth, getModalPost, modalPostInsertReply,
          handleFollowClick, modalPostDeleteReply} = this.props;
		return(
        <main className="search_body">
          <Hashpage
            ui={ui}
            keyword={this.props.match.params.keyword}
            search={search}
            addHashPost={this.addHashPost}
            handleSearchModal={this.handleSearchModal}
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
	searchHash: (params) => dispatch(search.searchHash(params)),
  addHash: (params) => dispatch(search.addHash(params)),
  getModalPost: (params) => dispatch(search.getModalPost(params)),
  setModalInit: () => dispatch(search.setModalInit()),
  modalPostLike: (params) => dispatch(search.modalPostLike(params)),
  modalPostNotLike: (params) => dispatch(search.modalPostNotLike(params)),
  modalPostInsertReply: (params) => dispatch(search.modalPostInsertReply(params)),
  modalPostDeleteReply: (params) => dispatch(search.modalPostDeleteReply(params)),
  setModalPostIndex: (index) => dispatch(search.setModalPostIndex(index)),
  setInnerModal: () => dispatch(search.setInnerModal()),

  setLoadingInitial: () => dispatch(ui.setLoadingInitial()),
  setLoading: (params) => dispatch(ui.setLoading(params))
});


SearchHash = connect(mapStateToProps, mapDispatchToProps)(SearchHash)
export default withRouter(SearchHash);
