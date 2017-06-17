import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import Imgview from './Imgview'
import Videoview from './Videoview'
import Paging from './Paging'

class MediaView extends Component {
    constructor(props) {
        super(props);
        this.state={
          index: 0,
          style: {paddingBottom : '100%'}
        }
    }
    playVideo = () => {
      let video=ReactDOM.findDOMNode(this.refs.mediadiv).firstChild.firstChild.firstChild;
      video.paused ? video.play() : video.pause();
    }
    handleAftBfClick = (e) => {
      if(e.target === this.bfbtn){
        this.setState(prevState => ({
          ...this.state,
      		index:prevState.index-1
    	  }));
      }
      if(e.target === this.aftbtn){
        this.setState(prevState => ({
          ...this.state,
      		index:prevState.index+1
    	  }));
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
      const { index } = this.state;
        return(
          <div className="mediaview">
          <div className="postview_bodywraper">
            <div className="postview_body" style={this.state.style} ref="mediadiv">
              {post.media[this.state.index].mediatype === "image" ?
              <Imgview
                media={post.media[index]}
                handleImgLoad={this.handleImgLoad}/> :
              <Videoview
                media={post.media[index]}/>}
            </div>
            {post.media.length > 1 && this.state.index !== 0 ?
                <a className="imgs media_afterbefore_btn media_before_btn"
                ref={ref => this.bfbtn = ref} role="button"
                onClick={this.handleAftBfClick}>before</a>:
                null
            }
            {post.media.length > 1 && this.state.index !== post.media.length-1 ?
                <a className="imgs media_afterbefore_btn media_after_btn"
                ref={ref => this.aftbtn = ref} role="button"
                onClick={this.handleAftBfClick}>after</a>:
                null
            }
            {post.media[index].mediatype === 'video' &&
                <a className="media_play_btn media_play_btn_img" role="button"
                onClick={this.playVideo}>play</a>
            }
          </div>
          {post.media.length>1&&
          <Paging
            media={post.media}
            index={this.state.index}
          />
          }
          </div>
        );
    }
}

export default MediaView;
