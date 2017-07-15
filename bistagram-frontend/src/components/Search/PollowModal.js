import React, { Component } from 'react';

import FollowUl from './FollowUl'
import Loading from '../Loading'

class PollowModal extends Component {
    componentDidMount() {
      this.followScrollDiv.addEventListener("scroll", this.handleFollowScroll);
    }
    componentWillUnmount() {
      this.followScrollDiv.removeEventListener("scroll", this.handleFollowScroll);
    }
    handleFollowScroll = () => {
      const {ui, loading, handleGetFollower, handleGetFollowing} = this.props;
      const scrollHeight = this.followScrollDiv.scrollHeight;
      const height = this.followScrollDiv.clientHeight;
      const maxScrollTop = scrollHeight - height;
      if(this.followScrollDiv.scrollTop === maxScrollTop && !loading){
        if(ui.followerModal){
          handleGetFollower();
        }else{
          handleGetFollowing();
        }
      }
    }
    handleClickOutside = (e) =>{
      const { handleFollowModal } = this.props;
      if(this.follow_list && !this.follow_list.contains(e.target)){
        handleFollowModal(-1);
      }
    }
    render() {
        const style={
          position: 'relative',
          zIndex: 3
        }
        const {auth, follow, loading, handleFollowClick} = this.props;
        return(
          <div style={style}>
            <div className="follow_modal_root" role="dialog" onClick={this.handleClickOutside}>
              <div className="modal_wrap">
                <div className="follow_list_pos follow_list_style" ref={(node) => { this.follow_list = node }}>
                  <div className="follow_list_header">
                    팔로워
                  </div>
                  <div className="follow_list_div" ref={(div) => { this.followScrollDiv = div }}>
                    {!loading &&
                      <FollowUl
                        auth={auth}
                        follow={follow}
                        handleFollowClick={handleFollowClick}
                      />
                    }
                    {loading &&
                      <Loading />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
export default PollowModal;
