import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as post from '../actions/post';
import * as form from '../actions/form';
import * as auth from '../actions/auth';
import * as ui from '../actions/ui';


import FollowList from '../components/Follow/FollowList';
import Postwrite from '../components/Post/Postwrite';
import Nothingpost from '../components/Post/Nothingpost';
import PostView from '../components/Post/PostView';
import Postmodal from '../components/Post/Postmodal';

import '../css/posts.css';
import '../css/postview.css';
import '../css/postwrite.css';
import '../css/modalList.css';

let position =	0;

class Post extends Component{

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
		const {post, setLoading} = this.props;
		setLoading({name:"main", value:true});
		this.getPostData();
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
		this.props.postformReset();
	}

	getPostData = async () =>{
		const {post, searchPosts, setLoadingInitial, recommendFollow} = this.props;
		try{
			await recommendFollow({start:0, count:3});
			if(post.posts.length===0){
				await searchPosts({atcnum: -1});
			}
			setTimeout(()=>{ setLoadingInitial() }, 300);
		}
		catch(e){
			document.location.reload();
		}
	}

	handleScroll = () => {
		const { post, searchPosts } = this.props;
		const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
		const windowBottom = windowHeight + window.pageYOffset;

		if (windowBottom >= docHeight) {
			if(post.isMore && !post.status.post){
				searchPosts({atcnum: post.posts[post.posts.length-1].atcnum});
			}
		}
	}

	handleFollowClick = (username) => {
		const {auth, setFollowUser, following, unfollow} = this.props;
		setFollowUser(username);
		if(auth.userinfo.followInfo.follower.indexOf(username)!==-1){
			unfollow({follower: username});
		}else{
			following({follower: username});
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

	handleModal = (index) =>{
		const {post, auth, setModal} = this.props;
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
		let result=false;
		if(index !== -1){
			result=post.posts[index].username===auth.userinfo.user.username?true:false
		}
		setModal({index: index, mine: result})
	}

	handleDeletePost = async() =>{
		const {post, deletePost} = this.props;
		await deletePost({atcnum: post.posts[post.index].atcnum, media: post.posts[post.index].media}).then(()=>this.handleModal(-1));
	}

	render(){
		const {post, auth, form, ui, setPostIndex, insertReply,
			deleteReply, getAllReplies, setPostMedia, moveMedia,
			deleteMedia, changeFormData, uploadPost, postformReset} = this.props;

		return(
				<main className="post_body" style={{display:`${ui.loading.main?'none':''}`}}>
					<section className="post_wrapper">

						<Postwrite
							post={form.post}
							upload={post.status.uploadPost}
							changeFormData={changeFormData}
							setPostMedia={setPostMedia}
							moveMedia={moveMedia}
							deleteMedia={deleteMedia}
							uploadPost={uploadPost}
							postformReset={postformReset}
						/>

						<FollowList
							auth={auth}
							handleFollowClick={this.handleFollowClick}
							page='mainpost'
						/>

						{post.posts.length===0&&
							<Nothingpost />
						}

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

					{post.status.modal&&
						<Postmodal
							lodingpost={post.status.post}
							deletePossible={post.status.mine && post.posts[post.index].atclikecount===0 && post.posts[post.index].repliescount===0?true:false}
							handleModal={this.handleModal}
							handleDeletePost={this.handleDeletePost}
						/>
					}

				</main>
		);
	}
};

const mapStateToProps = (state) => ({
	auth: state.auth,
  post: state.post,
	form: state.form,
	ui:state.ui
});

const mapDispatchToProps = (dispatch) => ({
	searchPosts: (params) => dispatch(post.searchPosts(params)),
	deletePost: (params) => dispatch(post.deletePost(params)),
	setPostIndex: (parmas) => dispatch(post.setPostIndex(parmas)),
	setModal: (parmas) => dispatch(post.setModal(parmas)),
	likeAtc: (params) => dispatch(post.likeAtc(params)),
	notlikeAtc: (params) => dispatch(post.notlikeAtc(params)),
	insertReply: (params) => dispatch(post.insertReply(params)),
	deleteReply: (replynum) => dispatch(post.deleteReply(replynum)),
	getAllReplies: (params) => dispatch(post.getAllReplies(params)),
	uploadPost: (params) => dispatch(post.uploadPost(params)),

	postformReset: () => dispatch(form.postformReset()),
	changeFormData: (formname, name, value) => dispatch(form.changeFormData(formname, name, value)),
	setPostMedia: (params) => dispatch(form.setPostMedia(params)),
	moveMedia: (params) => dispatch(form.moveMedia(params)),
	deleteMedia: (index) => dispatch(form.deleteMedia(index)),

	recommendFollow: (params) => dispatch(auth.recommendFollow(params)),
	setFollowUser: (username) => dispatch(auth.setFollowUser(username)),
	following: (params) => dispatch(auth.following(params)),
	unfollow: (params) => dispatch(auth.unfollow(params)),

	setLoadingInitial: () => dispatch(ui.setLoadingInitial()),
	setLoading: (params) => dispatch(ui.setLoading(params))
});


Post = connect(mapStateToProps, mapDispatchToProps)(Post)
export default Post;
