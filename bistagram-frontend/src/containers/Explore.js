import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storage } from '../helpers';
import * as follow from '../actions/follow';

import Header from '../components/Header/Header';
import FollowList from '../components/Follow/FollowList';
import FollowLoader from '../components/Follow/FollowLoader';

class Explore extends Component {
  componentDidMount() {
    let session = storage.get('session');
    if (session.logged){
      this.props.recommendFollow({id:session.user.id, start:0, count:10})
    }
  }

  handleFollowClick=(num)=>{
    let session = storage.get('session');
    const {follow, setClickIndex, following, unfollow } =this.props;

    setClickIndex(num);
    if(follow.user[num].follow === 0){
      following({id:session.user.id, followid:follow.user[num].id});
    }
    else{
      unfollow({id:session.user.id, followid:follow.user[num].id});
    }
  }

  render() {
		return(
      <section className="react-body">
      {console.log("익스플")}
        <Header />
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
      </section>
    );
	}
};

const mapStateToProps = (state) => ({
	follow: state.follow
});

const mapDispatchToProps = (dispatch) => ({
  recommendFollow: (params) => dispatch(follow.recommendFollow(params)),
	setClickIndex: (index) => dispatch(follow.setClickIndex(index)),
	following: (params) => dispatch(follow.following(params)),
	unfollow: (params) => dispatch(follow.unfollow(params))
});


Explore = connect(mapStateToProps, mapDispatchToProps)(Explore)
export default Explore;
