import React, { Component } from 'react';

import Modalheader from './Modalheader';
import Modalmedia from './Modalmedia';
import Modalfooter from './Modalfooter';

class Searchmodal extends Component {

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside = (e) =>{
      const {handleSearchModal} = this.props;
      const {modaldiv, bfmodalbtn, afmodalbtn} = this;
      if (modaldiv && !modaldiv.contains(e.target) && bfmodalbtn!==e.target && afmodalbtn!==e.target) {
          handleSearchModal(-1);
      }
    }
    handleKeyPress = (e) => {
      if(e.charCode === 13){
        e.preventDefault();
      }
    }
    render() {
        const modalstyle={
          position: 'relative',
          zIndex: 2
        }
        const {search, auth, atcindex, handleBfAfModal, handleFollowClick, handleModalLikeClick} = this.props;
        return(
          <div style={modalstyle}>
            <div className="modal_root" role="dialog" onClick={this.handleClickOutside}>

              <div className="search_modal_bfafbtn_body">
                <div className="search_modal_bfafbtn_position">
                  <div className="search_modal_bfafbtn_wrap">
                    {atcindex!==0 &&
                    <a className="imgs search_modal_bfbtn search_modal_bfbtn_img"
                      role="button" ref={(a) => { this.bfmodalbtn = a }}
                      onClick={()=>handleBfAfModal(-1)}>
                      이전
                    </a>
                    }
                    {atcindex<search.posts.popular.length+search.posts.recent.length-1 &&
                    <a className="imgs search_modal_afbtn search_modal_afbtn_img"
                      role="button" ref={(a) => { this.afmodalbtn = a }}
                      onClick={()=>handleBfAfModal(1)}>
                      다음
                    </a>
                    }
                  </div>
                </div>
              </div>

              <div className="modal_post_body">
                <div className="modal_post_position modal_post_style" ref={(div) => { this.modaldiv = div }}>
                  <article className="modal_article">

                    <Modalheader
                      auth={auth}
                      search={search}
                      handleFollowClick={handleFollowClick}
                    />

                    <Modalmedia
                      search={search}
                    />

                    <Modalfooter
                      search={search}
                      handleModalLikeClick={handleModalLikeClick}
                      handleKeyPress={this.handleKeyPress}
                    />

                    <div className="modal_more_div">
                      <button className="imgs more_btn more_btn_img more_btn_display">
                        옵션 더 보기
                      </button>
                    </div>

                  </article>
                </div>
              </div>
              <button className="modal_canclebtn">닫기</button>
            </div>
          </div>
        );
    }
}
export default Searchmodal;
