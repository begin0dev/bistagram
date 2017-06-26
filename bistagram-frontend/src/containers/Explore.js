import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as follow from '../actions/follow';
import * as ui from '../actions/ui';

import FollowList from '../components/Follow/FollowList';
import FollowLoader from '../components/Follow/FollowLoader';

class Explore extends Component {

  async componentDidMount() {
    const {setLoadingInitial, setLoading} = this.props;
    setLoading({name:"explore", value:true});
    await this.props.recommendFollow({start:0, count:20});
    setTimeout(()=>{ setLoadingInitial() }, 200);
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
          {this.props.ui.loading.explore?
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
  auth: state.auth,
	follow: state.follow,
	ui:state.ui
});

const mapDispatchToProps = (dispatch) => ({
  recommendFollow: (params) => dispatch(follow.recommendFollow(params)),
	setFollowClickIndex: (index) => dispatch(follow.setFollowClickIndex(index)),
	following: (params) => dispatch(follow.following(params)),
	unfollow: (params) => dispatch(follow.unfollow(params)),

  setLoadingInitial: () => dispatch(ui.setLoadingInitial()),
  setLoading: (params) => dispatch(ui.setLoading(params))
});


Explore = connect(mapStateToProps, mapDispatchToProps)(Explore)
export default Explore;
