import React, { Component } from 'react';

import Modalpaging from './Modalpaging'

import Imgview from '../Post/Imgview'
import Videoview from '../Post/Videoview'

class Modalmedia extends Component {
    constructor(props) {
        super(props);
        this.state={
          style: {paddingBottom : '100%'}
        }
    }
    handleAftBfClick = (e) => {
      const {post, changeModalInfo} = this.props;
      let index=post.mdIndex;
      if(e.target === this.bfbtn){
        changeModalInfo({name: 'mdIndex', value: index-1});
        changeModalInfo({name: 'play', value: false});
      }
      if(e.target === this.aftbtn){
        changeModalInfo({name: 'mdIndex', value: index+1});
        changeModalInfo({name: 'play', value: false});
      }
    }
    playVideo = () => {
      const {changeModalInfo} = this.props;
      let video=this.videoRef;
      video.paused ? video.play() : video.pause();
      changeModalInfo({name: 'play', value: true});
    }
    handleImgLoad = ({target:img}) =>{
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      let heightper = height*100/width;
      if(heightper<75){	heightper ='75'	}
      else if(heightper>123){	heightper ='123'}
      this.setState({
        ...this.state,
        style:{
          ...this.state.style,
          paddingBottom:`${heightper}%`
        }
      });
    }
    render() {
        const {post} = this.props;
        let index = post.mdIndex;
        let play = post.play;
        return(
          <div className="modal_media_body">
            <div>
              <div className="modal_media_frame">
                <div className="postview_body" style={this.state.style}>
                  {post.media && post.media[index].mediatype.match("image") ?
                    <Imgview
                      media={post.media[index]}
                      handleImgLoad={this.handleImgLoad}
                    />
                  :
                    post.media &&
                    <Videoview
                      media={post.media[index]}
                      videoRef={video => this.videoRef = video}
                    />
                  }
                  {post.media && post.media[index].mediatype.match("video") ?
                    <a className="videoPlay_a" role="button" onClick={this.playVideo}> </a>:null
                  }
                </div>
                {post.media && post.media.length > 1 && index !== 0 ?
                    <a className="imgs media_afterbefore_btn media_before_btn"
                    ref={ref => this.bfbtn = ref} role="button"
                    onClick={this.handleAftBfClick}>before</a>:
                    null
                }
                {post.media && post.media.length > 1 && index !== post.media.length-1 ?
                    <a className="imgs media_afterbefore_btn media_after_btn"
                    ref={ref => this.aftbtn = ref} role="button"
                    onClick={this.handleAftBfClick}>after</a>:
                    null
                }
                {post.media && post.media[index].mediatype.match('video') ?
                    <a className={`media_play_btn media_play_btn_img ${play?'':'media_play_btn_hover'}`}
                    onClick={this.playVideo}
                    role="button">play</a>
                :null}
              </div>
              {post.media && post.media.length>1&&
              <Modalpaging
                index={index}
                post={post}
              />
              }
            </div>
          </div>
        );
    }
}
export default Modalmedia;
