import React, { Component } from 'react';
import { connect } from 'react-redux';


import '../css/search.css';

class Search extends Component {

  render() {
		return(
        <main className="search_body">
          <article className="search_wrap">
            <header className="search_header">
              <h1 className="search_h1">
                #{this.props.match.params.keyword}
              </h1>
              <span>
                게시물 <span className="search_count"> 8,123 </span>
              </span>
            </header>
            <div className="search_hotpost_mb">
              <h2 className="search_h2">인기 게시물</h2>
              <div className="search_post_wrap">
                <a className="search_box_wrap search_box_block">
                  <div className="search_box_media_wrap">

                  dddd
                  </div>
                </a>
                <a className="search_box_wrap">
                  <div className="search_box_media_wrap">

                  dddd
                  </div>
                </a>
                <a className="search_box_wrap">
                  <div className="search_box_media_wrap">

                  dddd
                  </div>
                </a>
              </div>
            </div>
            <h2 className="search_h2">최근 사진</h2>
          </article>
        </main>
    );
	}
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});


Search = connect(mapStateToProps, mapDispatchToProps)(Search)
export default Search;
