import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as auth from '../actions/auth';
import * as ui from '../actions/ui';

import FollowList from '../components/Follow/FollowList';
import FollowLoader from '../components/Follow/FollowLoader';

class Explore extends Component {

  async componentDidMount() {
    const {setLoading, recommendFollow, setLoadingInitial} = this.props;
    setLoading({name:"explore", value:true});
    try{
      await recommendFollow({start:0, count:20}).then(()=>{
        setTimeout(()=>{
          setLoadingInitial()
        }, 200)
      });
    }
    catch(e){
      document.location.reload();
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

  render() {
    const {auth} = this.props;
		return(
        <main className="post_body">
			    <section className="post_wrapper">
          {this.props.ui.loading.explore?
            <FollowLoader />
            :
            <FollowList
							auth={auth}
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
  recommendFollow: (params) => dispatch(auth.recommendFollow(params)),
  setFollowUser: (username) => dispatch(auth.setFollowUser(username)),
	following: (params) => dispatch(auth.following(params)),
	unfollow: (params) => dispatch(auth.unfollow(params)),

  setLoadingInitial: () => dispatch(ui.setLoadingInitial()),
  setLoading: (params) => dispatch(ui.setLoading(params))
});


Explore = connect(mapStateToProps, mapDispatchToProps)(Explore)
export default Explore;
