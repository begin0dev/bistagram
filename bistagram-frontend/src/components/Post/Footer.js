import React, { Component } from 'react';

import Contentview from './Contentview'

const textareaSt={
  height: '18px'
}

class Footer extends Component {
    constructor(props) {
      super(props);
    }
    handleFocus =() =>{
      this.contenttextarea.focus();
    }
    handleLikeClick = () =>{
      console.log("작동")
    }
    handleReplyheight = (e) => {
      console.log(e.target.clientHeight)
    }
    handleReplySubmit = (e) => {
      e.preventDefault();

    }
    render() {
      const { post } = this.props;
        return(
          <div className="replybody_div">
            <section className={`like_img_section ${post.media.length > 1 && "like_imgs_section"}`} >
              <a className="like_abtn like_abtn_mgpd" role="button" aria-disabled="false" onClick={this.handleLikeClick}>
                { post.like ?
                  (<span className="imgs like_abtn_onoffimg like_abtn_img">좋아요</span>):
                  (<span className="imgs like_abtn_onoffimg notlike_abtn_img">안좋아요</span>)
                }
              </a>
              <a className="reply_abtn" role="button" aria-disabled="false" >
                  <span className="imgs like_abtn_onoffimg reply_abtn_img" onClick={this.handleFocus}>댓글달기</span>
              </a>
            </section>
            <section className="like_countview like_countview_media">
              <div className="like_countview_wrapper fontcolor_black">
                <span className="fontweight_600">
                좋아요 <span>{post.atclikecount}</span>개
                </span>
              </div>
            </section>
            <Contentview post={post}/>
            <section className="replywrite_st replywrite_st_media">
              <form className="like_form" autoComplete="off" onSubmit={this.handleReplySubmit}>
                {/*<div className='loding_div loding_img'></div>*/}
                <textarea name="content" className="reply_textarea" style={textareaSt}
                  aria-label="댓글 달기..." placeholder="댓글 달기..."
                  onKeyUp={this.handleReplyheight}
                  ref={(textarea) => { this.contenttextarea = textarea }}>
                </textarea>
              </form>
              <button className="imgs more_btn more_btn_img more_btn_display">옵션 더 보기</button>
            </section>
    			</div>
        );
    }
}
export default Footer;
