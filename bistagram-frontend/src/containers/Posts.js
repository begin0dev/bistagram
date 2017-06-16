import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as post from '../actions/post';
import * as follow from '../actions/follow';
import { storage } from '../helpers';

import Header from '../components/Header/Header';
import FollowList from '../components/Follow/FollowList';

class Post extends Component{
	constructor(props) {
		super(props);
		this.state = {
			follow: [],
			isMore: false
		};
	}
	componentDidMount() {
		let session = storage.get('session');
		if (session.logged) {
			this.props.searchPosts({id:session.user.id, start:this.props.post.start});
			this.props.recommendFollow({id:session.user.id, start:0, count:3})
		}
	}
	handleFollowClick=(num)=>{

	}
	render(){
		return(
			<section className="react-body">
				<Header />
				<main className="post_body">
					<section className="post_wrapper">
						<FollowList
						user={this.props.follow.user}
						page='mainpost'
						/>

						<div className="post_marginbt30px">
							<div className="scroll_lodingdiv">
							{this.state.isMore && <div className="loding_div loding_lgimg"></div>}
							</div>
						</div>
					</section>
				</main>
			</section>
		);
	}
};

const mapStateToProps = (state) => ({
  post: state.post,
	follow: state.follow
});

const mapDispatchToProps = (dispatch) => ({
	searchPosts: (params) => dispatch(post.searchPosts(params)),
	recommendFollow: (params) => dispatch(follow.recommendFollow(params))
});


Post = connect(mapStateToProps, mapDispatchToProps)(Post)
export default Post;
