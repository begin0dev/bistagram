import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storage } from '../helpers';
import * as follow from '../actions/follow';

import FollowList from '../components/Follow/FollowList';
import FollowLoader from '../components/Follow/FollowLoader';

class Explore extends Component {
  componentDidMount() {
    let session = storage.get('session');
    if (session.logged){
      this.props.recommendFollow({start:0, count:10})
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

  render() {
		return(
        <main className="post_body">
			    <section className="post_wrapper">
          {this.props.follow.pageload ?
            <FollowLoader />:
            <FollowList
            follow={this.props.follow}
            handleFollowClick={this.handleFollowClick}
            page='explore'
            />
          }
			    </section>
        </main>
    );
	}
};

const mapStateToProps = (state) => ({
	follow: state.follow
});

const mapDispatchToProps = (dispatch) => ({
  recommendFollow: (params) => dispatch(follow.recommendFollow(params)),
	setFollowClickIndex: (index) => dispatch(follow.setFollowClickIndex(index)),
	following: (params) => dispatch(follow.following(params)),
	unfollow: (params) => dispatch(follow.unfollow(params))
});


Explore = connect(mapStateToProps, mapDispatchToProps)(Explore)
export default Explore;
