import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as post from '../actions/post';
import * as postfrm from '../actions/postfrm';
import * as follow from '../actions/follow';

import { storage } from '../helpers';

import FollowList from '../components/Follow/FollowList';
import Postwrite from '../components/Post/Postwrite';
import PostView from '../components/Post/PostView';
import Postmodal from '../components/Post/Postmodal';

import '../css/posts.css';
import '../css/postview.css';
import '../css/postwrite.css';
import '../css/modalList.css';

let top =	0;

class Post extends Component{
	constructor(props) {
		super(props);
		this.getPostData=this.getPostData.bind(this);
	}

	componentDidMount() {
		let session = storage.get('session');
		if (session.logged) {
			this.getPostData();
		}
	}

	async getPostData (){
		const {searchPosts, recommendFollow} = this.props;
		try {
			await searchPosts({start:this.props.post.start});
			await recommendFollow({start:0, count:3})
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
		const {follow, setFollowClickIndex, following, unfollow} = this.props;
		setFollowClickIndex(num);
		if(follow.user[num].follow === 0){
			following({follower:follow.user[num].username});
		}else{
			unfollow({follower:follow.user[num].username});
		}
	}

	handleModal = (index) =>{
		const {setModal} = this.props;
		let doc = document.documentElement;
		if(index !== -1){
			top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
			document.body.style.position= 'fixed';
			document.body.style.top= -top+'px';
			document.body.style.width= '100%';
		}
		else{
			document.body.style='';
			window.scrollTo(0, top);
		}
		setModal({index: index})
	}

	render(){
		const {post, auth, follow, postfrm, setPostIndex,
			insertReply, deleteReply, getAllReplies, setPostMedia,
			setPostMediaReset, moveMedia, deleteMedia, setPostContent,
			uploadPost, postformReset} = this.props;

		return(
				<main className="post_body">
					<section className="post_wrapper">

						<Postwrite
							post={postfrm.post}
							upload={post.status.uploadPost}
							setPostContent={setPostContent}
							setPostMediaReset={setPostMediaReset}
							setPostMedia={setPostMedia}
							moveMedia={moveMedia}
							deleteMedia={deleteMedia}
							uploadPost={uploadPost}
							postformReset={postformReset}
						/>

						<FollowList
							follow={follow}
							handleFollowClick={this.handleFollowClick}
							page='mainpost'
						/>

						<div className="post_marginbt30px">

							<PostView
								post={post}
								auth={auth}
								handleLikeClick={this.handleLikeClick}
								setPostIndex={setPostIndex}
								insertReply={insertReply}
								deleteReply={deleteReply}
								getAllReplies={getAllReplies}
								handleModal={this.handleModal}
							/>

							<div className="scroll_lodingdiv">
							{post.isMore && <div className="loding_div loding_lgimg"></div>}
							</div>

						</div>
					</section>

					{post.status.modal&& <Postmodal handleModal={this.handleModal}/>}

				</main>
		);
	}
};

const mapStateToProps = (state) => ({
	auth: state.auth,
  post: state.post,
	postfrm: state.postfrm,
	follow: state.follow
});

const mapDispatchToProps = (dispatch) => ({
	searchPosts: (params) => dispatch(post.searchPosts(params)),
	setPostIndex: (parmas) => dispatch(post.setPostIndex(parmas)),
	setModal: (parmas) => dispatch(post.setModal(parmas)),
	likeAtc: (params) => dispatch(post.likeAtc(params)),
	notlikeAtc: (params) => dispatch(post.notlikeAtc(params)),
	insertReply: (params) => dispatch(post.insertReply(params)),
	deleteReply: (replynum) => dispatch(post.deleteReply(replynum)),
	getAllReplies: (params) => dispatch(post.getAllReplies(params)),
	uploadPost: (params) => dispatch(post.uploadPost(params)),

	postformReset: () => dispatch(postfrm.postformReset()),
	setPostContent: (value) => dispatch(postfrm.setPostContent(value)),
	setPostMediaReset: () => dispatch(postfrm.setPostMediaReset()),
	setPostMedia: (params) => dispatch(postfrm.setPostMedia(params)),
	moveMedia: (params) => dispatch(postfrm.moveMedia(params)),
	deleteMedia: (index) => dispatch(postfrm.deleteMedia(index)),

	recommendFollow: (params) => dispatch(follow.recommendFollow(params)),
	setFollowClickIndex: (index) => dispatch(follow.setFollowClickIndex(index)),
	following: (params) => dispatch(follow.following(params)),
	unfollow: (params) => dispatch(follow.unfollow(params))
});


Post = connect(mapStateToProps, mapDispatchToProps)(Post)
export default Post;
