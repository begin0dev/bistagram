import React from 'react';


class Reply extends React.Component {

    render(){
      return (
			<div className="replybody_div">
				<section className="like_countview like_countview_media">
					<div className="like_countview_wrapper fontcolor_black">
						<span className="fontweight_600">
						좋아요 <span>{this.state.isLikeCount}</span>개
						</span>
					</div>
				</section>
				<ul className="reply_ul_mgpd">
					<li className="reply_li">
							<a className="reply_li_id fontcolor_black">{this.props.atc.mem.nickName}</a>
							<span>
							<span dangerouslySetInnerHTML={{__html: this.props.atc.content.replace(/#(\S*)/g,'<a href="search/#$1">#$1</a>').replace(/@(\S*)/g,'<a href="search/@$1">@$1</a>')}}></span>
							</span>
					</li>
					{this.state.isMore &&
					<li className="reply_li">
							<button className="reply_morebtn point" onClick={this.handleAllReplies}>댓글 {this.state.rpCount}개 모두 보기</button>
					</li>
					}
					{this.state.replies.map((contact, i) => {
						return(
							<li className="reply_li" key={"reply"+i}>
								{contact.fromMem.id == '${sessionScope.loginmem.id}' &&
								<button className="reply_delbtn" title="댓글 삭제" onClick={()=>this.handleRemove(i)} >댓글 삭제</button>
								}
								<a className="reply_li_id fontcolor_black">{contact.fromMem.nickName}</a>
								<span>
									<span dangerouslySetInnerHTML={{__html: contact.content.replace(/@(\S*)/g,'<a href="search/@$1">@$1</a>')}}></span>
								</span>
							</li>
						);
					})}
				</ul>
				<section className="replywrite_st replywrite_st_media">
					<a className="like_abtn like_abtn_mgpd" role="button" aria-disabled="false" onClick={this.handleClick}>
						{ this.state.isLike ?
							(<span className="imgs like_abtn_onoffimg like_abtn_img">좋아요</span>):
							(<span className="imgs like_abtn_onoffimg notlike_abtn_img">좋아요</span>)
						}
					</a>
					<form className="like_form" autoComplete="off" onSubmit={this.handleSubmit}>
						{!this.state.isEditable && (<div className='loding_div loding_img'></div>)}
						<input type="text"
							name="content"
							className="like_input like_input_media" aria-label="댓글 달기..." placeholder="댓글 달기..."
							onChange={this.updateContent}
							disabled={!this.state.isEditable}
							ref={(ref) => { this.contentInput = ref }}/>
					</form>
					<button className="imgs more_btn more_btn_img more_btn_display">옵션 더 보기</button>
				</section>
			</div>
      );
    }
}

export default Reply;
