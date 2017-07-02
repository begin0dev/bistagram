import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';

import Contentview from './Contentview'

const removeTag = (reply) => {
	return reply.replace(/(<([^>]+)>)/gi, "");
}

class Footer extends Component {
    constructor(props) {
      super(props);
      this.state={
        reply:''
      }
    }

    handleChangeText = (e) =>{
      if(this.state.reply.length<500){
      this.setState({
        reply: e.target.value
      });
      }
    }

    handleFocus = () =>{
      this.contenttextarea._rootDOMNode.focus();
    }

    handleGetReplies = () =>{
      const { post, getAllReplies, setPostIndex, index} = this.props;
      setPostIndex({index: index, replyindex: -1});
      getAllReplies({atcnum:post.atcnum, count:post.repliescount - post.replies.length});
    }

    hanedleDeleteReply = (replyindex) => {
      const { post, deleteReply, setPostIndex, index} = this.props;
      setPostIndex({index: index, replyindex: replyindex});
      deleteReply({replynum: post.replies[replyindex].replynum});
    }

    handleReplySubmit = (e) =>{
      const { post, insertReply, setPostIndex, index } = this.props;
      if(this.state.reply.length===0){
        return;
      }
      if(e.charCode === 13){
        setPostIndex({index: index, replyindex: -1});
        insertReply({atcnum: post.atcnum, content: removeTag(this.state.reply), username:post.username, nickname: post.userinfo.nickname});
        this.setState({
          reply: ''
        });
      }
    }

    handleKeyPress = (e) => {
      if(e.charCode === 13){
        e.preventDefault();
      }
    }

    render() {
      const { post, auth, likeload, replyload, index, handleLikeClick, handleModal } = this.props;
        return(
          <div className="replybody_div">
            <section className={`like_img_section ${post.media.length > 1 && "like_imgs_section"}`} >
              <button className="like_abtn like_abtn_mgpd" disabled={`${likeload?true:''}`}
                onClick={(e) => handleLikeClick(index)}>
                { post.like ?
                  (<span className="imgs like_abtn_onoffimg like_abtn_img">좋아요</span>):
                  (<span className="imgs like_abtn_onoffimg notlike_abtn_img">안좋아요</span>)
                }
              </button>
              <a className="reply_abtn" role="button" aria-disabled="false" onClick={this.handleFocus}>
                  <span className="imgs like_abtn_onoffimg reply_abtn_img">댓글달기</span>
              </a>
            </section>
            <section className="like_countview like_countview_media">
              <div className="like_countview_wrapper fontcolor_black">
                <span className="fontweight_600">
                좋아요 <span>{post.atclikecount}</span>개
                </span>
              </div>
            </section>

            <Contentview
              post={post}
              auth={auth}
              hanedleDeleteReply={this.hanedleDeleteReply}
              handleGetReplies={this.handleGetReplies}
            />

            <section className="replywrite_st replywrite_st_media">
              <form className="like_form" autoComplete="off" onKeyPress={this.handleReplySubmit}>
                {replyload&&
                  <div className='loding_div loding_img'></div>
                }
                <Textarea name="content" className="reply_textarea"
                  aria-label="댓글 달기..." placeholder="댓글 달기..."
                  onChange={this.handleChangeText}
                  onKeyPress={this.handleKeyPress}
                  ref={(textarea) => { this.contenttextarea = textarea }}
                  value={this.state.reply}
                  disabled={`${replyload?true:''}`}>
                </Textarea>
              </form>
              <button className="imgs more_btn more_btn_img more_btn_display"
              onClick={(e)=>handleModal(index)}>옵션 더 보기</button>
            </section>
    			</div>
        );
    }
}
export default Footer;
