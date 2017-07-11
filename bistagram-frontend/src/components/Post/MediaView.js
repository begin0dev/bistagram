import React, { Component } from 'react';

import Imgview from './Imgview'
import Videoview from './Videoview'
import Paging from './Paging'

const videostyle={
  paddingBottom : '100%'
}

class MediaView extends Component {
    constructor(props) {
        super(props);
        this.state={
          style: {paddingBottom : '100%'}
        }
    }
    playVideo = () => {
      const {atcindex, setMediaPlay} = this.props;
      let video=this.videoRef;
      video.paused ? video.play() : video.pause();
      setMediaPlay({atcindex: atcindex, value: video.paused ? false : true});
    }
    handleAftBfClick = (e) => {
      const {atcindex, setMediaIndex} = this.props;
      if(e.target === this.bfbtn){
        setMediaIndex({atcindex: atcindex, plusnum: -1});
      }
      if(e.target === this.aftbtn){
        setMediaIndex({atcindex: atcindex, plusnum: 1});
      }
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
      const { post } = this.props;
        return(
          <div className="mediaview">
          <div className="postview_bodywraper">
            <div className="postview_body"
              style={post.media[post.mdindex].mediatype && post.media[post.mdindex].mediatype.match("image")?
              this.state.style:
              videostyle}
            >
              {post.media[post.mdindex].mediatype && post.media[post.mdindex].mediatype.match("image") ?
              <Imgview
                media={post.media[post.mdindex]}
                handleImgLoad={this.handleImgLoad}
              />
              :
              <Videoview
                media={post.media[post.mdindex]}
                videoRef={video => this.videoRef = video}
              />}

              {post.media[post.mdindex].mediatype && post.media[post.mdindex].mediatype.match("video") ?
                <a className="videoPlay_a" role="button" onClick={this.playVideo}> </a>:null
              }

            </div>
            {post.media.length > 1 && post.mdindex !== 0 ?
                <a className="imgs media_afterbefore_btn media_before_btn"
                  ref={ref => this.bfbtn = ref} role="button"
                  onClick={this.handleAftBfClick}
                >
                  before
                </a>:
                null
            }
            {post.media.length > 1 && post.mdindex !== post.media.length-1 ?
                <a className="imgs media_afterbefore_btn media_after_btn"
                  ref={ref => this.aftbtn = ref} role="button"
                  onClick={this.handleAftBfClick}
                >
                  after
                </a>:
                null
            }
            {post.media[post.mdindex].mediatype && post.media[post.mdindex].mediatype.match('video') ?
                <a className={`media_play_btn media_play_btn_img ${post.play?'':'media_play_btn_hover'}`}
                  onClick={this.playVideo}
                  role="button">
                  play
                </a>
            :null}
          </div>
          {post.media.length>1&&
          <Paging
            media={post.media}
            index={post.mdindex}
          />
          }
          </div>
        );
    }
}

export default MediaView;
