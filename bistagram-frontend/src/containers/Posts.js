import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as post from '../actions/post';
import * as follow from '../actions/follow';
import { storage } from '../helpers';


import FollowList from '../components/Follow/FollowList';
import PostView from '../components/Post/PostView';
import Postmodal from '../components/Post/Postmodal';

import '../css/posts.css';
import '../css/postview.css';
import '../css/modalList.css';

class Post extends Component{
	constructor(props) {
		super(props);
		this.getPostData=this.getPostData.bind(this);
	}

	componentDidMount() {
		let session = storage.get('session');
		if (session.logged) {
			this.getPostData(session);
		}
	}

	async getPostData (session){
		const {searchPosts, recommendFollow} = this.props;
		try {
			await searchPosts({username:session.user.username, start:this.props.post.start});
			await recommendFollow({username:session.user.username, start:0, count:3})
		}
		catch(e) {
		}
	}

	handleLikeClick = (num) => {
		const {post, setPostIndex, likeAtc, notlikeAtc} = this.props;
		setPostIndex({index: num, replyindex: -1});
		if(post.posts[num].like){
			notlikeAtc({atcnum: post.posts[num].atcnum});
		}else{
			likeAtc({atcnum: post.posts[num].atcnum});
		}
	}

	handleFollowClick = (num) => {
		const {follow, setFollowClickIndex, following, unfollow } = this.props;
		setFollowClickIndex(num);
		if(follow.user[num].follow === 0){
			following({follower:follow.user[num].username});
		}else{
			unfollow({follower:follow.user[num].username});
		}
	}

	render(){
		const {post, follow, setPostIndex, insertReply, deleteReply, getAllReplies} = this.props;
		let session = storage.get('session');
		return(
				<main className="post_body">
					<section className="post_wrapper">
						<FollowList
						follow={follow}
						handleFollowClick={this.handleFollowClick}
						page='mainpost'
						/>

						<div className="post_marginbt30px">
							<PostView
								post={post}
								handleLikeClick={this.handleLikeClick}
								setPostIndex={setPostIndex}
								insertReply={insertReply}
								deleteReply={deleteReply}
								getAllReplies={getAllReplies}
								session={session}
							/>
							<div className="scroll_lodingdiv">
							{post.isMore && <div className="loding_div loding_lgimg"></div>}
							</div>
						</div>
					</section>
					<Postmodal />
				</main>
		);
	}
};

const mapStateToProps = (state) => ({
  post: state.post,
	follow: state.follow
});

const mapDispatchToProps = (dispatch) => ({
	searchPosts: (params) => dispatch(post.searchPosts(params)),
	setPostIndex: (parmas) => dispatch(post.setPostIndex(parmas)),
	likeAtc: (params) => dispatch(post.likeAtc(params)),
	notlikeAtc: (params) => dispatch(post.notlikeAtc(params)),
	insertReply: (params) => dispatch(post.insertReply(params)),
	deleteReply: (replynum) => dispatch(post.deleteReply(replynum)),
	getAllReplies: (params) => dispatch(post.getAllReplies(params)),

	recommendFollow: (params) => dispatch(follow.recommendFollow(params)),
	setFollowClickIndex: (index) => dispatch(follow.setFollowClickIndex(index)),
	following: (params) => dispatch(follow.following(params)),
	unfollow: (params) => dispatch(follow.unfollow(params))
});


Post = connect(mapStateToProps, mapDispatchToProps)(Post)
export default Post;
