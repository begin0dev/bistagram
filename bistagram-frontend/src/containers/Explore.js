import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as auth from '../actions/auth';
import * as ui from '../actions/ui';

import FollowList from '../components/Follow/FollowList';
import FollowLoader from '../components/Follow/FollowLoader';

class Explore extends Component {

  async componentDidMount() {
    const {setLoadingInitial, setLoading, recommendFollow} = this.props;
    setLoading({name:"explore", value:true});
    try{
      await recommendFollow({start:0, count:20}).then(()=>{
        setTimeout(()=>{ setLoadingInitial() }, 100)
      });
    }
    catch(e){
      document.location.reload();
    }
	}

  handleFollowClick = (num) => {
		const {auth, setFollowIndex, following, unfollow} = this.props;
		setFollowIndex(num);
		if(auth.userinfo.followInfo.follower.indexOf(auth.recommend.users[num].username)!==-1){
			unfollow({follower:auth.recommend.users[num].username});
		}else{
			following({follower:auth.recommend.users[num].username});
		}
	}

  render() {
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
	setFollowIndex: (index) => dispatch(auth.setFollowIndex(index)),
	following: (params) => dispatch(auth.following(params)),
	unfollow: (params) => dispatch(auth.unfollow(params)),

  setLoadingInitial: () => dispatch(ui.setLoadingInitial()),
  setLoading: (params) => dispatch(ui.setLoading(params))
});


Explore = connect(mapStateToProps, mapDispatchToProps)(Explore)
export default Explore;
