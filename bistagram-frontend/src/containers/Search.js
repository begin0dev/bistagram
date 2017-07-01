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
              <div className="grid_wrap">
                <div className="search_box">
                  <a>
                    <div className="search_box_media_wrap">
                      <div className="search_box_media_frame">
                        <img className="search_box_img" src="/upload/thumb/test1@naver.com1498824335047.png" alt=""></img>
                      </div>
                    </div>
                    <div className="search_video_icon_div">
                      <div>
                        <span className="imgs search_video_icon"></span>
                      </div>
                    </div>
                    <div className="search_box_mask">
                      <ul className="search_box_ul">
                        <li className="search_box_li search_box_like_mg">
                          <span className="imgs search_like_img">좋아요</span>
                          <span>200</span>개
                        </li>
                        <li className="search_box_li search_box_reply_mg">
                          <span className="imgs search_reply_img">댓글</span>
                          <span>2011</span>개
                        </li>
                      </ul>
                    </div>
                  </a>
                </div>

                <div>
                  <a>
                    <div className="search_box_media_wrap">
                      <div className="search_box_media_frame">
                        <img className="search_box_img" src="/upload/thumb/test1@naver.com1498824335047.png" alt=""></img>
                      </div>
                    </div>
                  </a>
                </div>

                <div>
                  <a>
                    <div className="search_box_media_wrap">
                      <div className="search_box_media_frame">
                        <img className="search_box_img" src="/upload/thumb/test1@naver.com1498824335047.png" alt=""></img>
                      </div>
                    </div>
                  </a>
                </div>

                <div>
                  <a>
                    <div className="search_box_media_wrap">
                      <div className="search_box_media_frame">
                        <img className="search_box_img" src="/upload/thumb/test1@naver.com1498824335047.png" alt=""></img>
                      </div>
                    </div>
                  </a>
                </div>

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
