import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as search from '../actions/search';
import * as ui from '../actions/ui';

import Loading from '../components/Loading';

import Hashpage from '../components/Search/Hashpage';

import '../css/search.css';

let position =	0;

class SearchHash extends Component {

  async componentDidMount() {
    const {searchHash, setLoading, setLoadingInitial} = this.props;
    setLoading({name:"search", value:true});
    window.addEventListener("scroll", this.handleScroll);		
    await searchHash({keyword: this.props.match.params.keyword}).then(()=>{
      setTimeout(()=>{ setLoadingInitial() }, 300);
    })
  }

  componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

  handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      if(search.isMore && !search.loading){
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

  handleModal = (index) =>{
    let doc = document.documentElement;
    if(index !== -1){
      position = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      document.body.style.position= 'fixed';
      document.body.style.top= -position+'px';
      document.body.style.width= '100%';
    }
    else{
      document.body.style='';
      window.scrollTo(0, position);
    }
  }

  render() {
    const {search, ui} = this.props;
		return(
        <main className="search_body">
          <Hashpage
            keyword={this.props.match.params.keyword}
            search={search}
            ui={ui}
            addHashPost={this.addHashPost}
          />
          {ui.loading.search && <Loading />}
        </main>
    );
	}
};

const mapStateToProps = (state) => ({
	search:state.search,
  ui:state.ui
});

const mapDispatchToProps = (dispatch) => ({
	searchHash: (params) => dispatch(search.searchHash(params)),
  addHash: (params) => dispatch(search.addHash(params)),

  setLoadingInitial: () => dispatch(ui.setLoadingInitial()),
  setLoading: (params) => dispatch(ui.setLoading(params))
});


SearchHash = connect(mapStateToProps, mapDispatchToProps)(SearchHash)
export default SearchHash;
