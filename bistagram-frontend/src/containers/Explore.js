import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storage } from '../helpers';
import * as follow from '../actions/follow';

import Header from '../components/Header/Header';
import FollowList from '../components/Follow/FollowList';

class Explore extends Component {
  componentDidMount() {
    let session = storage.get('session');
    if (session.logged){
      this.props.recommendFollow({id:session.user.id, start:0, count:10})
    }
  }
  render() {
		return(
      <section className="react-body">
        <Header />
        <main className="post_body">
			    <section className="post_wrapper">
            <FollowList
            user={this.props.follow.user}
            page='explore'
            />
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
	recommendFollow: (params) => dispatch(follow.recommendFollow(params))
});


Explore = connect(mapStateToProps, mapDispatchToProps)(Explore)
export default Explore;
